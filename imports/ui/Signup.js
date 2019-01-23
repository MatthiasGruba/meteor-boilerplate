import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Signup extends Component {

    constructor(props){
        super(props);

        this.state={
            error:''
        }
    }


    onSubmit(e){
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value;

        if(password.length<9)
            return this.setState({error:"Password must be more than 8 characters long!"});

        //wenn fürs json-Objekt keinen Eigenschaftsnamen wählt, nimmt es den Variablenname (und der passt)
        this.props.createUser({email,password},(err)=>{
            if(err){
                this.setState({
                    error:err.reason
                });
            }
            else{
                this.setState({
                    error:""
                });
            }
        });



    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={e => this.onSubmit(e)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="email" />
                        <input type="password" ref="password" name="password" placeholder="password" />
                        <button className="button">Create account</button>
                    </form>

                    <a onClick={()=>this.props.history.push("/")}>Have an account?</a>
                </div>
            </div>
        );
    }
}


Signup.propTypes = {
    createUser: PropTypes.func.isRequired,

}




export default withTracker(props=>{

    return {
        createUser:Accounts.createUser,
    }
})(Signup);