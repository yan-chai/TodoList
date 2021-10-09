import React, { Component } from 'react'
import { Card } from 'antd';

export default class List extends Component {
    render() {
        return (
            <div>
                {
                    this.props.lists.map((l)=>{
                        return (
                            <Card type="inner" title={l.title} extra={<a href={'http://localhost:3000/l/'+l.id}>More</a>}>
                                {l.description}
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}
