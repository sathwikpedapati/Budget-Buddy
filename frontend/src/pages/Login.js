import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Space, message,Card } from "antd";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner";
import LoginIcon from '@mui/icons-material/Login';
import  Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import { Color } from "antd/es/color-picker";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const {data}=await axios.post(
        "https://budget-buddy-backend-neon.vercel.app/api/v1/users/login",
        values
      );
      setLoading(false);
      message.success("Welcome to MoneyTrack");
      localStorage.setItem("user",JSON.stringify({...data.user}))
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Something Went Wrong");
      console.log(error);
    }
  };
    useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate("/")
      }
    },[navigate])
  return (
    <>
    <Header/>
      {loading && <Spinner />}
      <div className="register-page">
        <Card
      title={
    <span>
      Login <LoginIcon style={{ verticalAlign: 'middle' }} />
    </span>
  } >
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="d-flex">
            <Space>
              <Link to="/register">Not a user?</Link>
              <Button type="primary" htmlType="submit">
                Sign In
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
export default Login;
