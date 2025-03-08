import React, {Component} from 'react';
import PropTypes from "prop-types";
import "../assets/css/Header.css";

class Header extends Component {
    render(){
        const {location, area, group, category} = this.props;
        return (
            <div className="header">
                <div className="header__logo"><h3>Plan At</h3></div>
                <div className="header__search">
                    <div className="header__search__location">{location}, {area}</div>
                    <div className="header__search__group">{group}</div>
                    <div className="header__search__category">{category} </div>
                </div>
                <div className="header__login">
                    <div className="header__login__menu">

                    </div>
                    <div className="header__login__login">
                    </div>
                </div>
            </div>
        );
    }  
}

Header.propTypes = {
    location: PropTypes.string.isRequired,
    area: PropTypes.string,
    group: PropTypes.string,
    category: PropTypes.string,
}
 
export default Header;