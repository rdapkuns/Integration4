When running locally, make sure to:

1. Generate a localhost certificate:

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

2. Create an .env file in the root of this project where you sent NODE_ENV to development:

```
NODE_ENV=development
```

__

# For this project

## setup:
1. generate the certificates
2. add .env
3. "npm start" the server
4. go to https://ipadress
5. happi


## takeaways:
1. we will need a pretty big marker if we want to project from distance
2. the location based Ar can be 5 - 20 meters off so thats a no-go
3. for ar.js to work we need to use HTTPS protocol (meaning we have to set up a local server)
4. for 3d we use .glb
5. all the AR stuff has to be wrapped in "<a-scene"> container
6. for 2d to have transparency we have to use "greenscreen" with a chroma filter
