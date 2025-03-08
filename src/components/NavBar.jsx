import React from "react";
import "../assets/css/NavBar.css";
import { Link , useLocation,useHistory } from "react-router-dom";
import Logo from "../assets/images/planat_logo.png"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NavBar = (props) => {

 let link;
 let history = useHistory();
 if(useLocation().pathname==='/'){
      link= null;
 }
 else{
    link=<button className="button-back" onClick={() => history.goBack()}><ArrowBackIcon/></button>;
 }

  return (
    <div className="navbar">
     
        {link}
        <Link to="/"><img src={Logo} alt="Logo" width="50" height="50"  /></Link>
      
     
     
     {/* <div className="profile">
        {user && <div>{user.nickname}</div>}
        
        <button
          className="log-button"
         onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
  </div>*/}
    </div>
  );

 
};

export default NavBar;
