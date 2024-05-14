from datetime import datetime

def segundos_passados_no_mes(data):
    # Obter o primeiro dia do mês
    primeiro_dia_do_mes = datetime(data.year, data.month, 1)
    
    # Calcular a diferença em segundos entre a data fornecida e o primeiro dia do mês
    segundos_passados = (data - primeiro_dia_do_mes).total_seconds()
    
    return segundos_passados

def dias_no_mes():
    day_atual = datetime.now()
    ano_atual = datetime.now().year
    mes_atual = datetime.now().month
    
    if mes_atual in [1, 3, 5, 7, 8, 10, 12]:
        dias_no_mes = 31
    elif mes_atual in [4, 6, 9, 11]:
        dias_no_mes = 30
    else:
        if (ano_atual % 4 == 0 and ano_atual % 100 != 0) or (ano_atual % 400 == 0):
            dias_no_mes = 29
        else:
            dias_no_mes = 28
    
    return dias_no_mes 

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