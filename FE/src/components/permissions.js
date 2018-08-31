import React, {Component} from "react";
import Checkbox from './Checkbox';

export default class Permissions extends Component {
	constructor() {
		super();

		this.state = {
		  	checkedItems: new Map(),
		  	checkboxes: [{name:"add", value: 0}, {name:"edit",  value:0}]
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(e){
		// this.getUsers = JSON.parse(localStorage.getItem("userData"))
		fetch('http://localhost:4001/perm/1', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
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

	handleChange(e) {
		const item = e.target.name;
		const state = this.state
		const isChecked = e.target.checked;
		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
		console.log("isChecked",item, isChecked, state)
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


	render() {
		return (
			<div className="col-md-10 m-t-15">
				<label htmlFor="permissions">Permissions</label>
				<button className="btn btn-primary col-md-offset-12 col-md-3" onClick={this.handleSubmit}>Add Permissions</button>
				{this.getCheckbox()}
				<button className="btn btn-primary col-md-offset-6 col-md-2" onClick={this.handleSubmit}>SAVE</button>
			</div>
		);
	}
}
