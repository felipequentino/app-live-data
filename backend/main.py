from predict import Predict
import pandas as pd
from bot import Scrapper, Xlsm

""" predict_populacao = Predict("../data/populacao_2020-2023.csv")
predict_ocupacao = Predict("../data/pessoas_ocupadas_2020-2023.csv")
predict_metro = Predict("../data/CUSTOMETRO2023.csv", is_float=True) 
predict_desocupados = Predict("../data/DESEMPREGADOS2023.csv", is_to_multiply=True)"""
#predict_rendimento = Predict("../data/rendimento_habitual_2020-2023.csv")

""" y_arima_populacao = predict_populacao.model_arima()
y_arima_ocupacao = predict_ocupacao.model_arima()
y_arima_metro = predict_metro.model_forecast() 
y_arima_desocupados = predict_desocupados.model_sarima()"""
#y_arima_rendimento = predict_rendimento.model_arima()

""" save_predict_populacao = y_arima_populacao['2024-01':].__round__()
save_predict_ocupacao = y_arima_ocupacao['2024-01':].__round__()
save_predict_metro = y_arima_metro['2024-01':].__round__(2) 
save_predict_desocupados = y_arima_desocupados['2024-01':].__round__()"""
#save_predict_rendimento = y_arima_rendimento['2024-01':].__round__()

""" save_predict_populacao.to_csv("../data/data_predicted/predict_populacao_2024-2025.csv")
save_predict_ocupacao.to_csv("../data/data_predicted/predict_ocupacao_2024-2025.csv")
save_predict_metro.to_csv("../data/data_predicted/predict_metro_2024-2025.csv")
save_predict_desocupados.to_csv("../data/data_predicted/predict_desocupados_2024-2025.csv")"""
#save_predict_rendimento.to_csv("../data/data_predicted/predict_rendimento_2024-2025.csv")

bot_populacao = Scrapper.DataScraper(in_path = (
    "https://sidra.ibge.gov.br/geratabela?format=br.csv&name=tabela6022.csv&terr=N&rank=-&query=t/6022/n1/all/v/606/p/all/l/v,p,t"),
    out_path="data/bot_data/populacao_bot.csv", type_data="ibge")

bot_ocupacao = Scrapper.DataScraper(in_path=(
    "https://sidra.ibge.gov.br/geratabela?format=br.csv&name=tabela6320.csv&terr=N&rank=-&query=t/6320/n1/all/v/4090/p/all/c11913/96165/l/v,p%2Bc11913,t"),
    out_path="data/bot_data/ocupacao_bot.csv", type_data="ibge_ocupacao") # TODO: MULTIPLY 1000

bot_desocupacao = Scrapper.DataScraper(in_path=(
    "https://sidra.ibge.gov.br/geratabela?format=br.csv&name=tabela6318.csv&terr=N&rank=-&query=t/6318/n1/all/v/1641/p/all/c629/32446/l/v,p%2Bc629,t"
    ),
    out_path="data/bot_data/desocupacao_bot.csv", type_data="ibge_ocupacao") # TODO: MULTIPLY 1000

bot_rendimento = Scrapper.DataScraper(in_path=(
    "https://sidra.ibge.gov.br/geratabela?format=us.csv&name=tabela6392.csv&terr=N&rank=-&query=t/6392/n1/all/v/6293/p/all/l/v,p,t"
    ),
    out_path="data/bot_data/rendimento_bot.csv", type_data="rendimento") # TODO: MULTIPLY 1000

bot_anfavea = Xlsm.AnfaveaPlanilhaProcessor(url="https://anfavea.com.br/docs/SeriesTemporais_Autoveiculos.xlsm", output_path="SeriesTemporais.xlsm")

bot_populacao.run()
bot_ocupacao.run()
bot_desocupacao.run()
bot_rendimento.run()
bot_anfavea.run()
