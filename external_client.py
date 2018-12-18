import os
import json
import requests

configPath = os.path.join(os.getcwd(), "config.json")
config = json.load(open(configPath))

reverse_proxy = "https://%s.SANDBOX.verygoodproxy.com/data" % (config['tenantId'])
response = requests.post(reverse_proxy, json={'secret': 'go go go'})
print(str(response.content))
