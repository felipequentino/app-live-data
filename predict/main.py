from predict import Predict
import pandas as pd


""" predict_populacao = Predict("../data/populacao_2020-2023.csv")
predict_ocupacao = Predict("../data/pessoas_ocupadas_2020-2023.csv")
predict_metro = Predict("../data/CUSTOMETRO2023.csv", is_float=True) 
predict_desocupados = Predict("../data/DESEMPREGADOS2023.csv", is_to_multiply=True)"""
predict_rendimento = Predict("../data/rendimento_habitual_2020-2023.csv")

""" y_arima_populacao = predict_populacao.model_arima()
y_arima_ocupacao = predict_ocupacao.model_arima()
y_arima_metro = predict_metro.model_forecast() 
y_arima_desocupados = predict_desocupados.model_sarima()"""
y_arima_rendimento = predict_rendimento.model_arima()

""" save_predict_populacao = y_arima_populacao['2024-01':].__round__()
save_predict_ocupacao = y_arima_ocupacao['2024-01':].__round__()
save_predict_metro = y_arima_metro['2024-01':].__round__(2) 
save_predict_desocupados = y_arima_desocupados['2024-01':].__round__()"""
save_predict_rendimento = y_arima_rendimento['2024-01':].__round__()

""" save_predict_populacao.to_csv("../data/data_predicted/predict_populacao_2024-2025.csv")
save_predict_ocupacao.to_csv("../data/data_predicted/predict_ocupacao_2024-2025.csv")
save_predict_metro.to_csv("../data/data_predicted/predict_metro_2024-2025.csv")
save_predict_desocupados.to_csv("../data/data_predicted/predict_desocupados_2024-2025.csv")"""
save_predict_rendimento.to_csv("../data/data_predicted/predict_rendimento_2024-2025.csv")
