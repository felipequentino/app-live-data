import requests
import pandas as pd
import os

class AnfaveaPlanilhaProcessor:
    def __init__(self, url, output_path):
        """
        Inicializa o processador com a URL do arquivo e o caminho de saída.
        """
        self.url = url
        self.output_path = output_path
        self.mapeamento = {
            "autoveiculos_licenciamento_total": 1,
            "autoveiculos_producao": 4,
            "autoveiculos_exportacao": 5,
        }

    def baixar_planilha(self):
        """
        Baixa a planilha .xlsm do site da Anfavea, simulando User-Agent de navegador.
        """
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/95.0.4638.69 Safari/537.36"
            ),
            "Accept": "*/*",
        }
        print("Baixando planilha da Anfavea...")
        response = requests.get(self.url, headers=headers, stream=True)
        response.raise_for_status()

        with open(self.output_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Download concluído: {self.output_path}")

    def processar_planilha(self):
        """
        Lê a planilha xlsm e separa as colunas de interesse em arquivos CSV.
        """
        print("Processando planilha...")
        df = pd.read_excel(self.output_path, sheet_name=0, header=None, engine="openpyxl")
        print("Shape inicial:", df.shape)

        # Filtrar linhas onde a primeira coluna (coluna 0) não seja nula
        df = df[df[0].notna()].copy()
        print("Shape após filtrar datas:", df.shape)

        # Renomear a primeira coluna para "Data"
        df.rename(columns={0: "Data"}, inplace=True)

        # Iterar sobre o mapeamento de colunas para criar CSVs
        for nome_csv, col_idx in self.mapeamento.items():
            if col_idx not in df.columns:
                print(f"Coluna {col_idx} não encontrada no DataFrame. Ajuste o mapeamento!")
                continue

            df_temp = df[["Data", col_idx]].dropna()
            df_temp.columns = ["Data", "Valor"]

            output_file = f"./data/bot_data/{nome_csv}.csv"
            df_temp.to_csv(output_file, index=False, sep=";")
            print(f"Gerado CSV: {output_file}")

    def excluir_planilha(self):
        """
        Exclui o arquivo baixado para liberar espaço.
        """
        if os.path.exists(self.output_path):
            os.remove(self.output_path)
            print(f"Arquivo excluído: {self.output_path}")
        else:
            print(f"Arquivo não encontrado para exclusão: {self.output_path}")


    def run(self):
        """
        Executa o processo completo: baixa e processa a planilha.
        """
        self.baixar_planilha()
        self.processar_planilha()
        self.excluir_planilha()

