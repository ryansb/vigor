import requests
from bs4 import BeautifulSoup
from pprint import pprint
import boto3
import json
import hashlib

ddb = boto3.resource('dynamodb', region_name='us-east-2')

table = ddb.Table("vigor-dev-CustomActionTable-KMKIK0QYZENO")
def empty_dropper(item):
    """Used for list/dict types that may contain empty strings

    Recurses over the lists and dicts, replacing '' with None values"""
    if isinstance(item, dict):
        return {k: empty_dropper(v) for k, v in item.items()}
    elif isinstance(item, list):
        return [empty_dropper(v) for v in item if v != '']
    elif item == '':
        return
    return item

def handler(event, context):
    doc = requests.get('https://www.citizenscience.gov/catalog/#').text
    soup = BeautifulSoup(doc, 'html.parser')
    with table.batch_writer() as batch:
        for active in soup.find_all(attrs={'data-project-status': 'Active'}):
            title = active.find('a').text.strip()
            agency = active.find('img').attrs['title']
            action = {
               'Link': 'https://www.citizenscience.gov' + active.find('a').attrs['href'],
               'Title': title,
               'Description': f'Help the US {agency} with their project {title}',
               'CallToAction': 'Pitch in!',
               'Category': 'political'
            }
            print("Saving event", action['Link'], action['Title'])
            p = dict(
                Id=hashlib.md5(json.dumps(action, sort_keys=True).encode()).hexdigest(),
                **action
            )
            batch.put_item(Item=empty_dropper(p))

if __name__ == '__main__':
    c = (handler(None, None))
    pprint(c)
