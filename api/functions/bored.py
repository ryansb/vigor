import random
import requests
from pprint import pprint
from datetime import datetime
import boto3

ddb = boto3.resource('dynamodb', region_name='us-east-2')

table = ddb.Table("vigor-dev-CustomActionTable-KMKIK0QYZENO")

def get(topic):
    resp = requests.get(f'https://www.boredapi.com/api/activity?type={topic}&participants=1').json()
    return {
        'Id': resp['key'],
        'Title': resp['activity'],
    }


def handler(event, context):
    with table.batch_writer() as batch:
        for i in range(3):
            r = get('relaxation')
            p = dict(
                Id=r['Id'],
                Category='wellness',
                ExpiryEpoch=int(datetime.now().timestamp() + 300),
                Link='#',
                CallToAction="I did it",
                Description=r['Title'],
                Title=r['Title']
            )
            batch.put_item(Item=p)
        for i in range(3):
            r = get('education')
            p = dict(
                Id=r['Id'],
                Category='learning',
                ExpiryEpoch=int(datetime.now().timestamp() + 300),
                Link='#',
                CallToAction="I did it",
                Description=r['Title'],
                Title=r['Title']
            )
            batch.put_item(Item=p)

if __name__ == '__main__':
    print(handler(None, None))
