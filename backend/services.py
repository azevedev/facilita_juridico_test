import requests
import os
from dotenv import load_dotenv
load_dotenv()

def fetch_activities(min_price, max_price, participants, difficulty, type):
    BORED_API_URL = os.getenv('BORED_API_URL')
    response = requests.get(
        BORED_API_URL,
        params={ "minprice": min_price, "maxprice": max_price, 
                    "participants": participants, 
                    "acessibility": difficulty, "type": type },                  
    )
    
    return response.json()