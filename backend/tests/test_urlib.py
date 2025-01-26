from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv
import os

def configurar_driver(caminho_driver, headless=False):
    """
    Configura e retorna uma instância do WebDriver do Chrome.
    
    :param caminho_driver: Caminho para o ChromeDriver.
    :param headless: Executa o navegador em modo headless se True.
    :return: Instância do WebDriver.
    """
    chrome_options = Options()
    if headless:
        chrome_options.add_argument("--headless")  # Executa em segundo plano
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    service = ChromeService(executable_path=caminho_driver)
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def extrair_valor_tooltip(driver, url, tempo_espera=10):
    """
    Abre a URL fornecida, extrai o valor da segunda tooltip e retorna o valor.
    
    :param driver: Instância do WebDriver.
    :param url: URL da página a ser processada.
    :param tempo_espera: Tempo máximo de espera para elementos.
    :return: Valor extraído da tooltip ou mensagem de erro.
    """
    try:
        driver.get(url)
        wait = WebDriverWait(driver, tempo_espera)
        
        # Aguarda até que ambas as tooltips estejam presentes no DOM
        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.br-tooltip span.text")))
        
        # Localiza todas as tooltips
        tooltip_elements = driver.find_elements(By.CSS_SELECTOR, "div.br-tooltip span.text")
        
        # Verifica quantas tooltips foram encontradas
        print(f"URL: {url}")
        print(f"Total de tooltips encontradas: {len(tooltip_elements)}")
        
        # Verifica se há pelo menos duas tooltips
        if len(tooltip_elements) >= 2:
            # Seleciona a segunda tooltip (índice 1)
            valor_tooltip = tooltip_elements[1].get_attribute("textContent").strip()
            print(f"Valor da Segunda Tooltip: {valor_tooltip}\n")
            return valor_tooltip
        else:
            mensagem = "Não foram encontradas tooltips suficientes na página."
            print(f"Valor da Tooltip: {mensagem}\n")
            return mensagem
    
    except Exception as e:
        mensagem = f"Ocorreu um erro: {e}"
        print(f"Valor da Tooltip: {mensagem}\n")
        return mensagem

def salvar_em_csv(nome_arquivo, dados, cabecalho=["URL", "Valor da Tooltip"]):
    """
    Salva os dados fornecidos em um arquivo CSV.
    
    :param nome_arquivo: Nome do arquivo CSV.
    :param dados: Lista de dicionários contendo os dados a serem salvos.
    :param cabecalho: Lista com os nomes das colunas do CSV.
    """
    file_exists = os.path.isfile(nome_arquivo)
    
    with open(nome_arquivo, mode='a', newline='', encoding='utf-8') as arquivo_csv:
        writer = csv.DictWriter(arquivo_csv, fieldnames=cabecalho)
        
        # Escreve o cabeçalho somente se o arquivo não existir
        if not file_exists:
            writer.writeheader()
        
        for linha in dados:
            writer.writerow(linha)

def main():
    # Caminho para o ChromeDriver
    caminho_driver = '/usr/lib/chromium-browser/chromedriver'  # Atualize conforme necessário
    
    # Lista de URLs a serem processadas
    sites = [
        {
            "url": "https://portaldatransparencia.gov.br/funcoes/10-saude?ano=2025",
            "csv": "saude_2025.csv"
        },
        {
            "url": "https://portaldatransparencia.gov.br/funcoes/12-educacao?ano=2025",
            "csv": "educacao_2025.csv"
        },
        {
            "url": "https://portaldatransparencia.gov.br/orgaos-superiores/52000-ministerio-da-defesa",
            "csv": "ministerio_da_defesa.csv"
        }
    ]
    
    # Inicializa o WebDriver
    driver = configurar_driver(caminho_driver, headless=False)  # Defina headless=True se desejar
    
    resultados = []  # Lista para armazenar os resultados temporariamente
    
    try:
        for site in sites:
            url = site["url"]
            csv_nome = site["csv"]
            
            # Extrai o valor da tooltip
            valor = extrair_valor_tooltip(driver, url)
            
            # Prepara os dados para salvar no CSV
            dados_para_salvar = [{
                "URL": url,
                "Valor da Tooltip": valor
            }]
            
            # Salva os dados no arquivo CSV correspondente
            salvar_em_csv(csv_nome, dados_para_salvar)
    
    except Exception as e:
        print(f"Ocorreu um erro durante a execução: {e}")
    
    finally:
        # Encerra o WebDriver
        driver.quit()
        print("Processamento concluído.")

if __name__ == "__main__":
    main()
