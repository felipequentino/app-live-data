import warnings
warnings.simplefilter("ignore")

from sktime.forecasting.compose import RecursiveTimeSeriesRegressionForecaster
from sktime.performance_metrics.forecasting import MeanAbsolutePercentageError
from sktime.forecasting.model_selection import temporal_train_test_split
from sktime.forecasting.naive import NaiveForecaster
from sklearn.ensemble import RandomForestRegressor
from sktime.forecasting.arima import AutoARIMA
from sktime.utils.plotting import plot_series
import pandas as pd
import numpy as np

df = pd.read_csv("../data/desempregados_2020-2023.csv")
df = df.T
#df = df.rename(columns={0:"populacao"})
""" for i in range(len(df)):
    converted_row = df[0][i].replace(',', '.')
    df[0][i] = float(converted_row) """
import matplotlib.pyplot as plt
plt.plot(df)
plt.show()
df.index = pd.to_datetime(df.index)
df.index = df.index.to_period("M")
