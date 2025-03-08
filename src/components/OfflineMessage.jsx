import React, { useState, useEffect } from 'react';


    function OfflineMessage(){
        const [isOnline, setNetwork] = useState(window.navigator.onLine);
        const updateNetwork = () => {
           setNetwork(window.navigator.onLine);
        };
        useEffect(() => {
           window.addEventListener("offline", updateNetwork);
           window.addEventListener("online", updateNetwork);
           return () => {
              window.removeEventListener("offline", updateNetwork);
              window.removeEventListener("online", updateNetwork);
           };
        });
        

    return !isOnline ? (
    <>
        <h5 className='offline-warning'>
            You are currently offline. <br/> Access to the application might be limited.
        </h5>
        <style jsx>{`
        .offline-warning {
            text-align: center;
            padding: 10px;
            position: fixed;
            z-index: 4;
            bottom: 0px;
            right: 0;
            width: 100%;
            background: rgba(58, 94, 87,0.97);
            color: white;
            margin: 0;
        }
      `}</style>
    </>) : null;
}

export default OfflineMessage;