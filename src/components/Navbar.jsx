import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../route.js';


	const Navigation = () => {
		return (
			<div>
				<ul>
				    <li><Link className="LinkStyle" to={routes.AUDIENCEVIEW}>Audience</Link></li>
				    <li><Link className="LinkStyle" to={routes.BOARDVIEW}>Board</Link></li>
				    <li><Link className="LinkStyle" to={routes.SPEAKERVIEW}>Speaker</Link></li>
						<li><Link className="LinkStyle" to={routes.ERRORPAGE}></Link></li>
				</ul>
			</div>
		)
	}

export default Navigation;
