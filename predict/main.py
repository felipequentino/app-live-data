from predict import Predict
import pandas as pd


predict = Predict("../data/populacao_2020-2023.csv")

y_arima = predict.model_arima()

save_predict = y_arima['2024-01':].__round__()
save_predict.to_csv("../data/predict_populacao_2024-2025.csv")