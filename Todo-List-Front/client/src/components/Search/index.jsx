import React, { Component } from 'react'
import { Input, Space, Card } from 'antd';
import axios from 'axios'
import List from '../List'
const { Search } = Input;


export default class SearchList extends Component {
	state = {
		lists: [],
	};

	saveLists = (l)=>{
		this.setState({lists: l})
	  };

	search = (value) => {
		//console.log(value)
		axios.get('http://localhost:3000/api/list', {
			params: {
			  title: value,
			}}).then(
			response => {
				this.saveLists(response.data.todoList);
			},
			error => {console.log('error', error);}
		)
	}
	render() {
		const {lists} = this.state;
		return (
			<div>
			<h1>This is Search Page</h1>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
				<Space direction="vertical"><Search
				placeholder="input search text"
				allowClear
				enterButton="Search"
				size="large"
				onSearch={this.search}
				/></Space>
				<div style={{ padding: 24, minHeight: 360 }}>
				<Card title="Result">
					<List lists={lists}/>
				</Card>
				</div>
			</div>
			</div>
		)
	}
}
