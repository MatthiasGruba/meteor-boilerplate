import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Accounts} from "meteor/accounts-base";

class PrivateHeader extends Component {


    onLogout = ()=>{
        Accounts.logout((err)=>{
            if(err)
                console.log(err);
        })
    };

    render() {
        const {title} = this.props;
        return (
            <div className="header">
                <div className="header__content">
                    <h1 className="header__title">{title}</h1>
                    <button className="header__button" onClick={()=>this.onLogout()}>Logout</button>
                </div>
            </div>
        );
    }
}


PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;