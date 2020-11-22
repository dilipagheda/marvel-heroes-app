# Marvel Heroes App

## How to run this project locally
Please follow below steps.

1. Create a file called `keys.js` in src/Apis directory. This file should hold public and private keys of Marvel API as follows.

```
const ApiKeys = {
  privateKey:'<insert private key>',
  publicKey:'<insert public key>'
}

export default ApiKeys
```

2. Run `npm install` to from the project root to install all required npm packages.

3. Run `npm run start` to run the application. Application can be accessible at `localhost:3000` URL.
