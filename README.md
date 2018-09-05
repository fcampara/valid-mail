## System to valid email from SMTP

In this system use _emaily-verify_ https://github.com/EmailVerify/email-verify to verife email is valid (Hotmail is only valid in production serve)

## Firebase Config

Set up your Firebase app in the console and get your configuration
for web apps.

Copy `firebase.conf.example.js` to `firebase.conf.js` and add the
applicable Firebase configuration items, make the same thing to `api/config/serviceAccountKey.example.json`

## Authentication

Enable Email/Password, Google and Facebook sign-in methods to your Firebase console in the
Authentication section. Create an account.

## Run
First install dependencies
```
# npm install
```

Second Start quasar-framework
```
https://quasar-framework.org/
# quasar-dev
```

Third Start nodejs
```
# npm run node
```

## License

Copyright (c) 2018-present Felipe Campara Silva

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
