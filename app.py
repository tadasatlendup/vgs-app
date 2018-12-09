import os
import json
import requests

certPath = os.path.join(os.getcwd(), "cert.pem")
configPath = os.path.join(os.getcwd(), "config.json")
config = json.load(open(configPath))

os.environ['HTTPS_PROXY'] = "https://%s:%s@%s.SANDBOX.verygoodproxy.com:8080" % (config['username'], config['password'], config['vaultId'])

response = requests.post("https://echo.apps.verygood.systems/post",
                         json={'secret': 'tok_sandbox_3qdmDcEmz31Jh4ksrD1ura'},
                         verify=certPath)
print(str(response.content))
