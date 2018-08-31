import React, {Component} from "react";
import Checkbox from './Checkbox';

export default class AddUser extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
		  	checkedItems: new Map(),
		  	checkboxes: [{name:"add", value: 0}, {name:"edit",  value:0}]
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleUserDetails = this.handleUserDetails.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
	}

	handleChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
	}


	getCheckbox(e) {
		const checkboxes = this.state.checkboxes
		return checkboxes.map(item => (
            <p className="fontSize" key={item.name}>
              <span>
              	<Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
              </span>
              <span className="m-l-15">
              	{item.name}
              </span>
            </p>
        ))
	}

	handleUserDetails(e){
		const { state } = this.state;
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	saveDetails(e){
		const {name } = this.state;
		if (name ) {
			fetch('http://localhost:4001/add/user', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			}).then(function(response) {
				return response.json()
			}).then(function(res) {
				if(res.status == "failure"){
					console.log(res.error)
				}else{
					console.log("result", res.result);

				}
			});
		}
	}


	render() {
		const { name } = this.state;
		return (
			<div className="col-md-10 m-t-15">
				<div className="col-md-offset-3 col-md-8">
					<label htmlFor="permissions">User</label>
					<input type="text" className="form-control" name="name" value={name} onChange={this.handleUserDetails} />
				</div>
				<label htmlFor="permissions">Permissions</label>
				{this.getCheckbox()}
				<button className="btn btn-primary col-md-offset-6 col-md-2" onClick={this.saveDetails}>SAVE</button>
			</div>
		);
	}
}