import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends Component {

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

        this.props.loginWithPassword({email},password,(err)=>{

            if(err){
                this.setState({
                    error:err.reason
                });
            }
            else{
                this.setState({
                    error:''
                })
            }
        });



    }

    renderErrors = () =>{
        if(this.state.error){
            //debugger;
            return <p>{this.state.error}</p>;
        }

    };




    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.renderErrors()}

                    <form className="boxed-view__form" onSubmit={e => this.onSubmit(e)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="email" />
                        <input type="password" ref="password" name="password" placeholder="password" />
                        <button className="button">Login</button>
                    </form>

                    <a onClick={()=>this.props.history.push("/Signup")}>Need an account?</a>
                </div>
            </div>
        );
    }
}


Login.propTypes= {
    loginWithPassword: PropTypes.func.isRequired
}

export default withTracker(props=>{

    return {
        loginWithPassword:Meteor.loginWithPassword
    }
})(Login)