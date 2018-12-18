# Secure traffic with Very Good Security

## Inbound traffic
Standard server setup without Very Good Security
1. Start the server `npm start`, this will start the endpoint localhost:8080

2. Use an upstream host like https://847b8891.ngrok.io (see https://ngrok.com/) by running `./ngrok http 8080`, this will match port 8080 to your localhost
   NOTE: remember this for later because you'll set this upstream host within the Very Good Security dashboard under the inbound route

3. Run the client `python3 external_client.py`, you can see that the response is in clear text form `{ secret: 'go go go' }`<br><br>

How to redact information with Very Good Security
1. If you stopped the server from the previous step, re-start the server `npm start`

2. Login to your Very Good Security dashboard secure the inbound payload (image below) by redacting the JSON path with the entry secret in the request phrase

![Inbound route](/images/InboundRoute.png)

3. If you run the client again `python3 external_client.py`, you'll see the secret is now tokenized `{ secret: 'tok_sandbox_qcrpzDmVPTDjfzroiA3rHe' }`<br><br>

## Outbound traffic
Now reveal the value when sending the request through a forward proxy server
1. Run the client `python3 internal_client.py`, you can see that the response is still in tokenized form `{ secret: 'tok_sandbox_qcrpzDmVPTDjfzroiA3rHe' }`

2. Login to your Very Good Security dashboard to replace the token in the payload (image below) by revealing the JSON path with the entry secret in the request phrase, note that we are using the forward proxy server https://USERNAME:PASSWORD@TENANTID.SANDBOX.verygoodproxy.com:8080 provided by Very Good Security (see 'internal_client.py') in order to test that the request is revealed and the response shows the proper secret

![Outbound route](/images/OutboundRoute.png)

3. If you run the client again `python3 internal_client.py`, you'll see the secret is revealed as `{ secret: 'go go go' }`<br><br>

## Explanation of the external and internal flow
You'll notice that there was an external client (browser, app, etc.) that knows the secret, but in order for that secret to avoid being seen on your server we tokenize it prior to reaching your internal servers

Once you're ready to use that secret with a trusted 3rd party, then you can send that token with an internal client to a trusted forward proxy server in order to reveal the actual secret to that 3rd party

Within your Very Good Security dashboard your routes should look similar to the image below

![Final routes](/images/FinalRoutes.png)
