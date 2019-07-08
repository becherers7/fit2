import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

class Register extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(this.state.username);
		event.preventDefault();

		//request to server to add a new username/password
		axios.post('http://localhost:8000/user/', {
			username: this.state.username,
			password: this.state.password
		}).then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup');
					this.setState({ //redirect to login page
						redirectTo: '/login'
					});
				// location.reload();
				} else {
					console.log('username already taken');
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error);
			});
	}


render() {
	return (
		<React.Fragment>
				<Grid>
					<Grid item xs={12}>
						<h3>Sign up</h3>
					</Grid>
					<Grid item xs={12}>
						<FormLabel className="form-label">Username</FormLabel>
					</Grid>
					<Grid item xs={12}>
						<TextField className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
							/>
					</Grid>

					<Grid item xs={12}>
						<FormLabel className="form-label" htmlFor="password">Password: </FormLabel>
					</Grid>
					<Grid item xs={12}>
						<TextField className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							mini
							onClick={this.handleSubmit}
							type="submit"
						>
							Sign up
						</Button>
					</Grid>
				</Grid>
		</React.Fragment>

	)
}
}

export default Register
