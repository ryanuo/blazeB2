import json
from index import app
from serverless_wsgi import handle_request

def handler(event, context):
    return handle_request(app, event, context)
