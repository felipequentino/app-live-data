from sktime.forecasting.naive import NaiveForecaster
from sktime.split import temporal_train_test_split
from sktime.forecasting.arima import AutoARIMA
from sktime.forecasting.sarimax import SARIMAX
from datetime import datetime
from django.db import models
from utils import segundos_passados_no_mes, dias_no_mes
import pandas as pd
import numpy as np
import time

QUANTIDADE_DE_MESES_PARA_PREVER = 12

class Predict():
        
    def __init__(self, dataset_path, is_float=False, is_to_multiply=False):
        df = pd.read_csv(dataset_path)
        df = df.T
        df.index = pd.to_datetime(df.index)
        df.index = df.index.to_period("M")

        if is_float:
            for i in range(len(df)):
                converted_row = df[0][i].replace(',', '.')
                df[0][i] = float(converted_row)

        df = df.rename(columns={0:"populacao"})
        df.populacao = pd.to_numeric(df.populacao)
        if is_to_multiply:
            df.populacao *= 1000
        y_train, y_test = temporal_train_test_split(df)
        fh = np.arange(len(y_test)+QUANTIDADE_DE_MESES_PARA_PREVER)+1

        self.df = df
        self.y_train = y_train
        self.y_test = y_test
        self.fh = fh

    def model_forecast(self):
        model = NaiveForecaster(strategy="drift", sp=12)
        model.fit(self.y_train)
        y_drift = model.predict(fh=self.fh)
        return y_drift

    def model_arima(self):
        model = AutoARIMA(sp=12)
        model.fit(self.y_train)
        y_arima = model.predict(fh=self.fh)
        return y_arima

    def model_sarima(self):
        model = SARIMAX()
        model.fit(self.y_train)
        y_sarima = model.predict(fh=self.fh)
        return y_sarima
    
    def predict_live(self):
        day_atual = datetime.now()
        # Calculando o número de segundos no mês atual
        dias_no_mes_qtd = dias_no_mes() 

        
        segundos_no_mes = dias_no_mes_qtd * 24 * 60 * 60  
        predict = self.model_arima()
        current_population = predict['populacao'].iloc[-2]
        predict_population = predict['populacao'].iloc[-1] # Pegando o valor da população prevista
        diff = predict_population - current_population
        seconds_of_month = segundos_passados_no_mes(day_atual)
        predict_per_second = diff / segundos_no_mes
        current_population += predict_per_second * seconds_of_month
        while True:
            current_population += predict_per_second
            print(current_population.__round__())
            time.sleep(1)