import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';

export class PrivateHeader extends Component {

    render() {
        const {title} = this.props;
        return (
            <div className="header">
                <div className="header__content">
                    <h1 className="header__title">{title}</h1>
                    <button className="header__button" onClick={()=>this.props.handleLogout()}>Logout</button>
                </div>
            </div>
        );
    }
}


PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout:PropTypes.func.isRequired
}

export default withTracker(props=>{
    return {
        handleLogout: ()=>Accounts.logout()
    }
})(PrivateHeader);

//export default PrivateHeader;