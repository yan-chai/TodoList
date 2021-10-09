import React, { Component } from 'react'
import axios from 'axios'
import { Descriptions, Button} from 'antd';
import { Table, Space} from 'antd';
import './index.css'

export default class Detail extends Component {
    state = {
        list: {},
    }
    
    s = () =>{
        const search = this.props.match.params
        console.log(search)
        axios.get('http://localhost:3000/api/list/'+search.id).then(
            response => {
                console.log(response.data.list)
                this.setState({list: response.data.list})
            }
        )
    }
    handleKeyUp = (event)=>{
		//解构赋值获取keyCode,target
		const {keyCode,target} = event
		//判断是否是回车按键
		if(keyCode !== 13) return
		//添加的todo名字不能为空
		if(target.value.trim() === ''){
			alert('Cannot enter empty')
			return
		}
		//将todoObj传递给App
		axios.post('http://localhost:3000/api/items', {
		name: target.value,
		ListId: this.state.list.id,
        done:false
        }).then(function (response) {
            if (response.status === 200) {
                alert("Add Success");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
		//清空输入
		target.value = ''
        this.forceUpdate()
	}
    updateTodo = (id, name)=>{
        const URL = 'http://localhost:3000/api/item/'+id
		axios.put(URL, {
        name: name,
        done: true
        }).then(function(response) {
            alert("You Done it!")
        }).catch(function (error) {
            console.log(error);
        });
	}
    deleteTodo = (id)=>{
		const URL = 'http://localhost:3000/api/item/delete/'+id
		axios.delete(URL).then(function(response) {
            alert("delete success")
        })
        .catch(function (error) {
            console.log(error);
        });
	}
    deleteList = ()=>{
        const id = this.state.list.id
        const URL = 'http://localhost:3000/api/list/delete/'+ id
        console.log(id)
		axios.delete(URL).then(function(response) {
            alert("delete success")
        })
        .catch(function (error) {
            console.log(error);
        });
	}
    render() {

        const columns = [
            {
              title: 'id',
              dataIndex: 'id',
              key: 'id',
              render: text => <a>{text}</a>,
            },
            {
              title: 'name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'done',
              dataIndex: 'done',
              key: 'done',
              render: text => text.toString()
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <a href="javascript:;" onClick={()=>{this.updateTodo(record.id, record.name)}}>Done</a>
                  <a href="javascript:;" onClick={()=>{this.deleteTodo(record.id)}}>Delete</a>
                </Space>
              ),
            },
          ];

        if (JSON.stringify(this.state.list) === "{}") {
            return (
                <div>
                    <Button onClick={this.s}>click me to get data</Button>
                </div>)
        } else {
            const items = this.state.list.Items
            return (
                <div>
                    <Button onClick={this.s}>click me to get data</Button>
                    <Descriptions title="Todo List Info" bordered style={{marginTop:50}}>
                        <Descriptions.Item label="ID">{this.state.list.id}</Descriptions.Item>
                        <Descriptions.Item label="TITLE">{this.state.list.title}</Descriptions.Item>
                        <Descriptions.Item label="DESCRIPTION">{this.state.list.description}</Descriptions.Item>
                    </Descriptions>
                    <div className="todo-header">
                    <input onKeyUp={this.handleKeyUp} type="text" placeholder="PLease enter new Item"/>
                    </div>
                    <Table columns={columns} dataSource={items}/>
                    <Button danger style={{marginLeft: 180, marginTop:30}} onClick={()=>{this.deleteList()}}>DELETE LIST</Button>
                </div>
        )}
    }
}
