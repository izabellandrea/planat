import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Logo from "../assets/images/planat_logo.png";
import firebase from "../services/firebase";
import "../assets/css/PushPermission.css";


function PushPermission() {
  const [open, setOpen] = React.useState(false);

  setTimeout(
    () => setOpen(true), 
    120000 //2mins
  );

  const handleClose = () => {
    setOpen(false);
  };
  let show=0;
  const msg=firebase.messaging();

  
  if (Notification.permission === "default" ) { //show the asking modal
    show=1;
  }

const Accept=()=>{  // clicked the accept button

  msg.getToken({vapidKey:"BOA9yERqNDQoPifpM8mcvGGyPnm1DmDPyg8X3jyJr6gf1A9C9yTn-QzcAHroL2lWWUpFXx-LUqjCqlbGml3_n98"})
  .then(function(currentToken) {
    // console.log("succesful")
    console.log(currentToken);
  })
  .catch(function(err){
    console.log("Error occured or permission denied!");
  })
 handleClose();
}

const myStyle = {
  color: "white",
  backgroundColor: "#3a5e57"}

if(show===1){
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <img src={Logo} alt="Logo" ></img>
          {"We'd like to send you personalised trip ideas."}
          
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}  style={{color: "#3a5e57"}} >
            No thanks
          </Button>
          <Button onClick={Accept} style={myStyle} >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
else{return null;}
}



export default  PushPermission;