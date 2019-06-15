import requests
import random

def handler(event, context):
    a_type = random.choice(['relaxation', 'education'])
    resp = requests.get(f'https://www.boredapi.com/api/activity?type={a_type}').json()
    return {
        'Id': resp['key'],
        'Title': resp['activity'],
        'Tags': [a_type]
    }

print(handler(None, None))
