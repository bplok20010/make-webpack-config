import React from "react";
import "./scss/Header.scss";

export default class Header extends React.Component {
	
	render(){
		const child = this.props.children;
		
		return child;	
	}	
}