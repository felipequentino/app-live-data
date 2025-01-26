import pandas as pd
import requests
import io
import re


class DataScraper:
    def __init__(self, in_path: str, out_path: str, type_data: str = "ibge"):
        """
        :param in_path: Pode ser a URL (como a do SIDRA) ou um caminho local.
        :param out_path: Caminho para salvar o CSV final.
        :param type_data: Tipo de dado ("ibge", "abinee", etc.).
        """
        self.in_path = in_path
        self.out_path = out_path
        self.type_data = type_data
        
        # Dicionário de abreviações de meses, para uso interno:
        self.mes_map = {
            "jan": 1, "fev": 2, "mar": 3,
            "abr": 4, "mai": 5, "jun": 6,
            "jul": 7, "ago": 8, "set": 9,
            "out": 10, "nov": 11, "dez": 12
        }

    def run(self):
        """
        Método principal: orquestra o download/leitura, parsing, limpeza,
        filtragem e exportação dos dados.
        """
        # 1) Baixar ou carregar o conteúdo
        file_content = self.download_file(self.in_path)
        
        # 2) Ler/parsing do CSV em pandas, conforme o type_data
        df_raw = self.parse_file(file_content, self.type_data)
        
        # 3) Transformação (conversão de colunas, datas, filtragem temporal, etc.)
        df_transformed = self.transform_data(df_raw, self.type_data)
        
        # 4) Exporta no formato final (duas linhas: datas e valores)
        self.export_csv(df_transformed, self.out_path)
        
        print(f"Processamento concluído. Arquivo salvo em: {self.out_path}")

    # ------------------------------------------------------------------------------
    # Métodos internos
    # ------------------------------------------------------------------------------

    def download_file(self, path_or_url: str) -> str:
        """
        Se 'path_or_url' for uma URL (http/https), faz o download.
        Caso contrário, tenta ler de um arquivo local.
        Retorna o conteúdo bruto do CSV (string).
        """
        if path_or_url.startswith("http"):
            # Download via requests
            res = requests.get(path_or_url)
            res.raise_for_status()
            return res.text
        else:
            # Leitura local
            with open(path_or_url, "r", encoding="utf-8") as f:
                return f.read()
    
    def parse_file(self, file_content: str, type_data: str) -> pd.DataFrame:
        """
        Faz o parsing do CSV de acordo com o tipo de dado ('ibge', 'abinee', etc.)
        e retorna um DataFrame cru, mas com as linhas e colunas de interesse.
        """
        if type_data.lower() == "ibge":
            # Ler somente as linhas relevantes (no caso da Tabela 6022 do SIDRA):
            # Observando o CSV, as linhas de cabeçalho (meses) e de dados (Brasil)
            # geralmente são 2 linhas após pular um certo número de metadados.
            csv_buf = io.StringIO(file_content)
            
            # Ajuste skiprows conforme a análise do arquivo (seja 3, 4 ou 5, etc.)
            # No seu exemplo final, a linha com os meses está no índice 4 (0-based).
            # A linha com Brasil está no índice 5.
            # Mas se identificou que skiprows=3 e nrows=2 funcionam, use assim:
            df_raw = pd.read_csv(
                csv_buf,
                sep=';',
                quotechar='"',
                skiprows=3,   # pular 3 (ou 4) linhas iniciais, ver o debug
                nrows=2,      # ler apenas essas 2
                header=None,
                engine='python'
            )
            return df_raw
        
        # Caso futuro: "abinee"
        elif type_data.lower() == "abinee":
            # Exemplo fictício de leitura:
            # df_raw = pd.read_csv(io.StringIO(file_content), sep=",")
            # return df_raw
            raise NotImplementedError("Parsing para 'abinee' ainda não implementado.")
        
        else:
            raise ValueError(f"Tipo de dado '{type_data}' não reconhecido.")

    def transform_data(self, df_raw: pd.DataFrame, type_data: str) -> pd.DataFrame:
        """
        Faz a limpeza, conversão e filtragem (mês-ano -> data, retirar colunas inúteis).
        Retorna um DataFrame já pronto.
        """
        if type_data.lower() == "ibge":
            # A 1ª linha lida (row 0) é o cabeçalho; a 2ª (row 1) são os valores
            df_raw.columns = df_raw.iloc[0]
            df_raw = df_raw[1:]  # remove a row 0 do corpo
            df_raw.reset_index(drop=True, inplace=True)
            
            # Descartar a primeira coluna, que costuma vir vazia ou com "Brasil"
            df_raw = df_raw.iloc[:, 1:]
            
            # Converter para numérico
            df_raw = df_raw.apply(pd.to_numeric, errors='coerce')
            
            # Renomear colunas ("jan-fev-mar 2020" -> "01/01/2020")
            novos_nomes = {}
            for col in df_raw.columns:
                novos_nomes[col] = self.extrair_data(col)
            df_raw.rename(columns=novos_nomes, inplace=True)
            
            # Ordenar colunas cronologicamente e filtrar a partir de 2020
            df_raw = self.ordenar_e_filtrar(df_raw, start_year=2020)
            
            return df_raw
        
        elif type_data.lower() == "abinee":
            # Exemplo hipotético de limpeza
            # ...
            raise NotImplementedError("Transform para 'abinee' ainda não implementado.")
        
        else:
            raise ValueError(f"Tipo de dado '{type_data}' não reconhecido.")

    def export_csv(self, df: pd.DataFrame, out_path: str):
        """
        Exporta no formato desejado: duas linhas (datas e valores).
        Exemplo de formatação:
            01/01/2020,02/01/2020,03/01/2020,...
            210474,210606,210738,...
        """
        if df.empty:
            print("DataFrame vazio! Nada a exportar.")
            return
        
        datas_csv = ",".join(df.columns)
        # df só tem 1 linha, se for a série IBGE. Pegamos a linha 0:
        valores_csv = ",".join(df.iloc[0].astype(str))
        
        conteudo_final = datas_csv + "\n" + valores_csv
        
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(conteudo_final)

    # ------------------------------------------------------------------------------
    # Métodos auxiliares
    # ------------------------------------------------------------------------------

    def extrair_data(self, tri_mensal: str) -> str:
        """
        Converte algo como "jan-fev-mar 2020" -> "01/01/2020".
        Retorna a string original se não casar o padrão.
        """
        tri_mensal = tri_mensal.lower().strip()
        match = re.search(r"^([a-z]{3})-[a-z]{3}-[a-z]{3}\s+(\d{4})$", tri_mensal)
        if not match:
            return tri_mensal  # ou "" se preferir
        
        mes_abrev = match.group(1)
        ano = match.group(2)
        mes_num = self.mes_map.get(mes_abrev)
        if mes_num is None:
            return tri_mensal
        
        return f"01/{mes_num:02d}/{ano}"

    def ordenar_e_filtrar(self, df: pd.DataFrame, start_year=2020) -> pd.DataFrame:
        """
        Converte colunas em datas (dd/mm/aaaa), ordena em ordem crescente
        e filtra a partir de 01/01/<start_year>.
        """
        def str_to_date(s):
            return pd.to_datetime(s, dayfirst=True, format="%d/%m/%Y", errors='coerce')

        # Ordenar colunas
        cols_ordenadas = sorted(df.columns, key=str_to_date)
        df = df[cols_ordenadas]

        # Filtrar colunas >= 01/01/<start_year>
        colunas_filtradas = []
        for c in df.columns:
            d = str_to_date(c)
            if d is not pd.NaT and d >= pd.to_datetime(f"{start_year}-01-01"):
                colunas_filtradas.append(c)

        return df[colunas_filtradas]

# ------------------------------------------------------------------------------
# Exemplo de uso da classe:
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    # Parâmetros de exemplo:
    in_path = (
        "https://sidra.ibge.gov.br/geratabela?"
        "format=br.csv&name=tabela6022.csv&terr=N&rank=-&"
        "query=t/6022/n1/all/v/606/p/all/l/v,p,t"
    )
    out_path = "populacao.csv"
    type_data = "ibge"

    # Instancia e executa o 'robô'
    scraper = DataScraper(in_path, out_path, type_data)
    scraper.run()
