import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, message,Card } from 'antd';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import  Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/v1/users/register", values);
       localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
      message.success("Registration Successful");
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <Header/>
    <div className="register-page">
      {loading && <Spinner />}
      <Card
      title={
    <span>
      Register <LockOpenIcon style={{ verticalAlign: 'middle' }} />
    </span>
  }>
      <Form layout="vertical" onFinish={submitHandler}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="d-flex">
          <Space>
            <Link to="/login">Already Registered?</Link>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Space>
        </div>
      </Form>
      </Card>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
