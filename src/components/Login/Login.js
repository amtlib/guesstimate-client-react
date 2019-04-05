import React, { Component } from 'react';
import './Login.css'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            rememberMe: false
        }
    }
    handleChange = (e) => {
        const name = e.target.type === 'checkbox' ? 'rememberMe' : e.target.type
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({ [name]: value })
    }
    handleSubmit = (e) => {
        console.log('redirect!')
    }
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m8 offset-m2">
                            <div className="card">
                                <div className="card-action blue white-text center-align">
                                    <h4>Guesstimate</h4>
                                </div>
                                <div className="card-content">

                                    <div className="form-field">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" placeholder="Your email here..." defaultValue={this.state.email} onChange={this.handleChange} id="email" />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder="*****" onChange={this.handleChange} defaultValue={this.state.password} id="password" />
                                    </div>
                                    <div className="form-field">
                                        <label>
                                            <input type="checkbox" onChange={this.handleChange} defaultChecked={this.state.rememberMe} />
                                            <span>Remember me?</span>
                                        </label>
                                    </div>
                                    <br />
                                    <div className="form-field center">
                                        <a href="/categories" className="btn waves-effect waves-light blue">Submit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
