import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const nav=useNavigate();
 
    const onFinish = values =>{
        const{email, password} = values
        axios.post(`http://localhost:3001/api/validatePassword`,{email,password})
        .then(res=>{
          if(res.data.validation){
            alert('Your password is correct')
            nav(`/1`);
          }else{
            alert('Your password or email is not correct')
          }
        })
    }
    
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    
    <div style={{width:400}}>
        <h1 style={{textAlign:'center'}}>Login</h1>

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

      </Form.Item>

      <Form.Item>
        <Button   type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}