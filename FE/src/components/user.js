import React, {Component} from "react";
import Checkbox from './Checkbox';

export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			newUser: "",
		  	checkedItems: new Map(),
		  	checkboxes: [{name:"add", value: 0}, {name:"edit",  value:0}]
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	componentDidMount() {
		this.getUsers = JSON.parse(localStorage.getItem("userData"))
		this.setState({
	      	user : this.getUsers[0].users
	    });
	}


	handleChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
	}
	getCheckbox(e) {
		const checkboxes = this.state.checkboxes
		return checkboxes.map(item => (
            <label key={item.name}>
              {item.name}
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </label>
        ))
	}


	handleSubmit(e){
		e.preventDefault();
		const state = this.state;
		const users = []
		users.push(state.newUser)
		console.log("state.user", state.newUser)
		const listUsers = users.map((usr) =>
	    	<label key={usr.name}>{usr.name}</label>

		);
		this.setState({
	      	user : users
	    });
	}

	render() {
	  	const { checkboxes , Checkbox} = this.state
		return (
			<div>
				<div>
					<h2>USERS</h2>
					<button className="btn btn-primary col-md-offset-12 col-md-2" onClick={this.handleSubmit}>ADD USER</button>
				</div>
				<form name="form">
					<div>
						<label htmlFor="users">Users</label>
						<input type="text" className="form-control" name="user.name" value={this.state.newUser} />

					</div>
					<div>
						<label htmlFor="permissions">Permissions</label>

						{this.getCheckbox()}
					</div>
				</form>
			</div>
		);
	}
}