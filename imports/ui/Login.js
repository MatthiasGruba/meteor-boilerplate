import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

class Login extends Component {

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

        Meteor.loginWithPassword({email},password,(err)=>{
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
        if(this.state.error)
            return <p>{this.state.error}</p>;
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

                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}

export default Login;