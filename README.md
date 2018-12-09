# Secure traffic with Very Good Security

## Inbound traffic
Standard server setup without Very Good Security
1. Start the server `npm Start`

2. Run the cURL request `curl http://localhost:8080/data -H "Content-Type: application/json" -d '{ "secret": "blah blah" }'`

3. You can see that the response is in clear text form `{ secret: 'blah blah' }`<br><br>

How to redact information with Very Good Security
1. Start the server `npm Start`

2. Run the cURL request `curl http://localhost:8080/send -H "Content-Type: application/json" -d '{ "secret": "blah blah" }'`

3. On the server you can see the response that is sent back to the client.
```
{ args: {},
  data: '{"secret":"blah blah"}',
  files: {},
  form: {},
  headers:
   { Accept: 'application/json',
     Connection: 'close',
     'Content-Length': '22',
     'Content-Type': 'application/json',
     Host: 'echo.apps.verygood.systems',
     'Vgs-Request-Id': '1ab83830d0bcd19',
     'Vgs-Tenant': '<YOUR VAULT ID HERE>',
     'X-Forwarded-Host': '<YOUR VAULT ID HERE>.sandbox.verygoodproxy.com' },
  json: { secret: 'blah blah' },
  origin:
   '73.93.118.216, 73.93.118.216, 52.72.130.32, 18.215.58.36, 100.99.33.64',
  url: 'https://tntyr6oltbg.sandbox.verygoodproxy.com/post' }
```

4. Login to Very Good Security to redact the secret. Send the cURL request again. You should see the secret field has a tokenized value.
```
{ args: {},
  data: '{"secret":"tok_sandbox_3qdmDcEmz31Jh4ksrD1ura"}',
  files: {},
  form: {},
  headers:
   { Accept: 'application/json',
     Connection: 'close',
     'Content-Length': '47',
     'Content-Type': 'application/json',
     Host: 'echo.apps.verygood.systems',
     'Vgs-Request-Id': '1fd40f9042b5c031',
     'Vgs-Tenant': '<YOUR VAULT ID HERE>',
     'X-Forwarded-Host': '<YOUR VAULT ID HERE>.sandbox.verygoodproxy.com' },
  json: { secret: 'tok_sandbox_3qdmDcEmz31Jh4ksrD1ura' },
  origin:
   '73.93.118.216, 73.93.118.216, 52.72.130.32, 34.194.18.145, 100.115.209.128',
  url: 'https://tntyr6oltbg.sandbox.verygoodproxy.com/post' }
```
<br>

## Outbound traffic
Using Python3 simply run `python3 app.py` to see the token revealed
