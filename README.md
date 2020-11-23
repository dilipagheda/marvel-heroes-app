# Marvel Heroes App

Marvel Heroes App interacts with the Marvel API (https://developer.marvel.com/account) and shows characters and some fun stuff about them. The aim is to build a react app that provides a delightful experience to the end user.

## How to access this application
This web application is deployed on AWS S3 at the moment. You can access it via

http://marvel-heroes-app.s3-website-ap-southeast-2.amazonaws.com/

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

## App Optimisation
I have optimised the app so that it preservers the state globally and does not make API calls unncessarily. 

1. In the home page, search input is debounced by 1 sec. so, app does not make API call on every key press. if user types 'aar' within 1 sec then app makes only one API call.
2. In the details page, app does not make API calls to fetch comic details unless user expands a perticular comic in accordian. once expanded, app makes only one API call for that perticular comic. thereafter, if user expands the same comic then app doesn't make another API call as that state is preserved. 

## Error handling
1. App handles the route that doesn't exist. so, if user types /abcdef then app shows error page.
2. If API calls fails because of server error, then app redirects to the error page and also prints logs on console.

## State management
- I have used global state using Context API and hooks to keep the characters data along with pagination information.
- All other state is implemented as local to a perticular component where required.

## Styling
I have used saas for writing css. Each component will have its own sass file and only that file will be imported to that component.

## Demo
![](https://github.com/dilipagheda/marvel-heroes-app/blob/master/demo/marvel_app_demo.gif)
