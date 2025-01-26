from predict import Predict
import pandas as pd


predict_populacao = Predict("../data/populacao_2020-2023.csv")


y_arima_populacao = predict_populacao.model_arima()


save_predict_populacao = y_arima_populacao['2024-01':].__round__()
save_predict_populacao.to_csv("../data/data_predicted/predict_populacao_2024-2025.csv")
