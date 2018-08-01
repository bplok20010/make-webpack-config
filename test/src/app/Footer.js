import "./scss/Footer.scss";
import React from "react";

export default class Footer extends React.Component {
	
	render(){
		const child = this.props.children;
		
		return child + process.env.NODE_ENV === 'production' ? '' : '(dev 0.0.1)';	
	}	
}