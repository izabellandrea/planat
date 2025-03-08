(() => {
  window.scrollTo(0,0);

   /* function determineAppServerKey() {
      const vapidPublicKey =
      "BMWlLTqj3RmjyvBH1aKzUZPef5GuHOUSbM1DPaOH6C23DSal67HB7KaPjIZsuz5lBc--8mKmEPSgUOa52h1Ur8k";
        return urlBase64ToUint8Array(vapidPublicKey);
    }*/
  
    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .then((response)=>{
          console.log('Service worker registration succeeded:', response);
        })
      });  
    } 
    else {
      alert('No service worker support in this browser');
    }



   /* window.addEventListener("load", () => {
    function handleNetworkChange(event) {
      if (navigator.onLine) {
        document.body.classList.remove("offline");
      } else {
        document.body.classList.add("offline");
      }
    }
    window.addEventListener("offline", handleNetworkChange);
  });*/

  })();

  