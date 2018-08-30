import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Login from "./components/login";
import Users from "./components/user";


class App extends Component {
	render() {
		const userDetails = localStorage.getItem("userData");
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						<Switch>
							if(userDetails){
								<Route path='/home' component={Users}/>
							}else{
								<Route path='/' component={Login}/>
							}
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}
		 
export default App;
