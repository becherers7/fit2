import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			muiTheme: '',
		}
	};
	componentDidMount() {
		let appTheme = require("../Styles/MaterialUI-Theme.js");
		let tempTheme = createMuiTheme(appTheme);
		this.setState({
			  "muiTheme": tempTheme
		});
	}
	render(){
		// const { classes } = this.props;
		let muiTheme = this.state.muiTheme;
		return (
			<MuiThemeProvider theme={muiTheme}>
				<Card>
				    <CardContent>
					  	{
					  		this.props.secretData && 
						  	<Typography style={{ fontSize: '16px', color: 'green' }}>
							  	Welcome <strong>{this.props.user.name}</strong>!
							  	<br />
							  	{this.props.secretData}
						  	</Typography>
						}
				  	</CardContent>
				</Card>
			</MuiThemeProvider>
		);
	}
}

export default Dashboard;
