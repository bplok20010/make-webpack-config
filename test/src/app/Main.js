import img from './static/c.png';
import React from "react";

export default class Main extends React.Component{
	
	render(){
		const child = this.props.children;
		//npm install --save-dev babel-plugin-syntax-dynamic-import
		import(/* webpackChunkName: "Alert" */ "./Alert").then( Alert => alert(123) )
		
		return [
			<img src={img} />,
			'test'
		];	
	}	
}