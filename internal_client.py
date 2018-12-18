import os
import json
import requests

certPath = os.path.join(os.getcwd(), "cert.pem")
configPath = os.path.join(os.getcwd(), "config.json")
config = json.load(open(configPath))

forward_proxy = "https://%s:%s@%s.SANDBOX.verygoodproxy.com:8080" % (config['username'], config['password'], config['tenantId'])

response = requests.post(
    'https://echo.apps.verygood.systems/post',
    json = {"secret": "tok_sandbox_qcrpzDmVPTDjfzroiA3rHe"},
    headers={"Content-type": "application/json"},
    proxies={"https": forward_proxy},
    verify=certPath
)
print(response.json()['data'])
