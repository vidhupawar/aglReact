import React, {Component} from "react";
import '../App.css';

import { BrowserRouter as Router,  Link, withRouter } from "react-router-dom";

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			submitted: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({ submitted: true });
		const { username, password } = this.state;
		const props  = this.props;
		if (username && password) {
			console.log("username && password", username , password)
			fetch('http://localhost:4001/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"username" : username,
					"password": password
				},
			}).then(function(response) {
				return response.json()
			}).then(function(res) {
				if(res.status == "failure"){
					console.log(res.error)
				}else{
					console.log("result", res.result);
					// history.push('/home');
					localStorage.setItem("userData", JSON.stringify(res.result));
					localStorage.setItem("token", JSON.stringify(res.token));
					props.history.push("/home");
				}
			});
		}
	}
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render(){
		const { username, password, submitted } = this.state;
		return(
			<div className="col-md-6 col-md-offset-3 m-t-50">
				<h2>Login</h2>
				<form name="form">
					<div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
						{submitted && !username &&
							<div className="help-block">Username is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
						{submitted && !password &&
							<div className="help-block">Password is required</div>
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
					</div>
				</form>
			</div>
		)
	}
}
