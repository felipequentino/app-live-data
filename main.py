import pandas as pd
import requests
import json

# Declares the base url for calling the API
base_url_UNPD = "https://population.un.org/dataportalapi/api/v1"

country_M49 = 76 #set the country code
indicator_code_UNPD = 22 #set the indicator code
start_year =  1970 #set the start year
end_year =  2030 #set the end year

#define the target URL
target = base_url_UNPD + f"/data/indicators/{indicator_code_UNPD}/locations/{country_M49}/start/{start_year}/end/{ end_year}"

response = requests.get(target) #Call the API
j = response.json() #Format response as JSON
df_UNPD = pd.json_normalize(j['data']) #Read JSON data into dataframe

# As long as the response contains information in the 'nextPage' field, the loop will continue to download and append data
while j['nextPage'] is not None:
    response = requests.get(j['nextPage'])
    j = response.json()
    df_temp = pd.json_normalize(j['data'])
    df_UNPD = df_UNPD._append(df_temp)

# Verifies that the number of records available from API call matches the length of the dataframe
assert len(df_UNPD)==j['total'], "DataFrame observations do not match total number of records in response"

#Filter data to only include women between ages 15 and 19 and median variants of the estimates
""" df_UNPD = df_UNPD.loc[(df_UNPD['variant']=="Median") & (df_UNPD['ageStart']==15) & (df_UNPD['ageEnd']==19),] """


print(df_UNPD)