import React, { useEffect, useState } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "../assets/css/Install.css";

let deferredPrompt;  
    
function Install() {
  window.scrollTo(0, 0);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setOpen(true);
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      setOpen(false);

      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };
  
  return (
    
    <div className="Install">
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
        message="Get our free app! It won't take up space on your device !"
        action={
            <React.Fragment>
            {installable &&
              <Button className="install-button" color="secondary" size="small" id="button" onClick={handleInstallClick}>
                INSTALL
              </Button>
            }
              <IconButton size="small" aria-label="close" color="white" onClick={handleClose}><CloseIcon fontSize="small" /></IconButton>
            </React.Fragment>
              }
        />  
    </div>
  );
}

export default Install;