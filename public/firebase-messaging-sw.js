 importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

//needed to deploy to firebase

 if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('../firebase-messaging-sw.js')
       .then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
       }).catch(function(err) {
        console.log('Service worker registration failed:', error);
       });
  }
  else {
    console.log('Service workers are not supported.');
  }

 firebase.initializeApp({
     messagingSenderId: "1038255685950",
   })

 const initMessaging = firebase.messaging()