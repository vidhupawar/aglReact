import React, {Component} from "react";
import { BrowserRouter as Router,  Link } from "react-router-dom";
import Permissions from './permissions';
import '../App.css';


export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			getUsers: [],
			newUser: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getUsersFnction = this.getUsersFnction.bind(this);
		
	}

	componentDidMount() {
		this.getUsers = JSON.parse(localStorage.getItem("userData"))[0].users
		this.setState({
			getUsers : this.getUsers
		})
	}

	getUsersFnction(e){
		const getUsers = this.state.getUsers
		return getUsers.map(item => (
			<p className="fontSize" key={item.name}>
	          	<span className="m-l-15">
	          	<Link to={'/user/' + item.id}>{item.name}</Link>
	          	</span>

	         </p>
        ))
	}



	handleSubmit(e){
		e.preventDefault();
		const state = this.state;
		const users = []
		users.push(state.newUser)
		const listUsers = users.map((usr) =>
	    	<p key={usr.name}>{usr.name}</p>

		);
		this.setState({
	      	user : users
	    });
	}

	render() {
	  	const {user} = this.state
		return (
			<div>
				<div>
					<h2>USERS</h2>
					<button className="btn btn-primary col-md-offset-12 col-md-2" onClick={this.handleSubmit}><Link to={'/add'}>ADD USER</Link></button>
				</div>
				<form name="form" className="col-md-12">
					<div>
						{this.getUsersFnction()}
					</div>
				</form>
			</div>
		);
	}
}