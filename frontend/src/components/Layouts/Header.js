import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { message, Space, Button, Modal } from 'antd';
import { FundOutlined } from "@ant-design/icons";
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [loginuser, setLoginUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const DeleteUser=async()=>{
     try {
     const data= await axios.post("https://budget-buddy-backend-neon.vercel.app/users/delete-user",{id:user._id});
      message.success("User has been Deleted Successfully");
      localStorage.removeItem("user");
      navigate("/login");
     console.log(data)
     } catch (error) {
      console.log(error);
      message.error(error);
     }
  }
  const logout = () => {
    localStorage.removeItem("user");
    message.success("LogOut Successfully");
    navigate("/login");
  };

  const RefreshHandler = () => {
    window.location.reload();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MoneyTrack
              <FundOutlined style={{ marginLeft: "0.4rem", cursor: "pointer" }} onClick={RefreshHandler} />
            </Typography>
            <Space>
           {user ? (
                <>
                  <Button
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "1px solid #ccc",
                      color: "#333"
                    }}
                    onClick={showModal}
                  >
                    View Info
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#EF4444",
                      border: "none",
                      color: "white"
                    }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Typography style={{ color: "white" }}>🔑 Sign in to continue</Typography>
              )}
            </Space>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        title="User Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {
          loginuser ? (
            <>
              <p><strong>Name:</strong> {loginuser.name}</p>
              <p><strong>Email:</strong> {loginuser.email}</p>
            </>
          ) : (
            <p>No user info found</p>
          )
        }
        <Button style={{color:"white",backgroundColor:"red"}} onClick={DeleteUser}> Delete Account</Button>      
      </Modal>
    </>
  );
};

export default Header;
