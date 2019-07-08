import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	card: {
		marginTop: '5%',
	}
});

class Dashboard extends Component {
	constructor(props){
		super(props);
	};
	render(){
		const { classes } = this.props;
		return (
			<Card className={classes.card}>
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
		);
	}
}

export default withStyles(styles, { withTheme: true })(Dashboard);
