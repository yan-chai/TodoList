import React, { Component } from 'react'
import './App.css'
import 'antd/dist/antd.min.css';
import {NavLink,Route} from 'react-router-dom'
import { Layout, Menu} from 'antd';
import {
  FileOutlined,
} from '@ant-design/icons'; 

import SearchList from './components/Search'
import Lists from './components/Lists'
import Add from './components/Add'
import Detail from './components/Detail'

const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo">Todo List</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<FileOutlined />}>
              <NavLink activeClassName="atguigu" className="list-group-item" to="/search">Search</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              <NavLink activeClassName="atguigu" className="list-group-item" to="/lists">Lists</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
              <NavLink activeClassName="atguigu" className="list-group-item" to="/add">Add List</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
                <Route path="/lists"><Lists saveLists={this.saveLists}/></Route>
                <Route path="/search"><SearchList saveLists={this.saveLists}/></Route>
                <Route path="/add"><Add/></Route>
                <Route path="/l/:id" component={Detail}></Route>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
