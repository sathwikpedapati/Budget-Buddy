import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import { Button, Modal, Form, Input, Select, message, Table,DatePicker ,Space} from 'antd';
import axios from "axios";
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons"
import moment from "moment";
import Chart from '../components/Layouts/Chart';
import Spinner from '../components/Layouts/Spinner';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTranscations, setAllTranscations] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate,setSelectDate]=useState();
  const [type,setType]=useState("all");
  const[viewData,setViewData]= useState("table");
  const[editable,setEditable]= useState(null);

  const columns = [
    { title: "Date", dataIndex: "date" ,render:(text)=><span>{moment(text).format("YYYY-MM-DD")}</span>},
    { title: "Amount", dataIndex: "amount" },
    { title: "Type", dataIndex: "type" },
    { title: "Category", dataIndex: "category" },
    { title: "Reference", dataIndex: "reference" },
    { title: "Actions",
      render:(text,record)=>(
        <div>
          <EditOutlined onClick={()=>{setEditable(record);setShowModal(true)}}/>
          <DeleteOutlined style={{marginLeft:"1rem"}} onClick={()=>{handleDelete(record)}}/>
        </div>
      )
     }
  ];

  const getAllTranscations = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("https://budget-buddy-backend-neon.vercel.app/api/v1/transcations/get-transcations", {
        userid: user._id,
        frequency,
        selectedDate,
        type
      });
      setAllTranscations(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error in Fetch Transcations");
    }
  };

  useEffect(() => {
    getAllTranscations();
  }, [frequency,selectedDate,type]);
   const handleDelete=async(record)=>{
     try {
      setLoading(true);
      await axios.post("https://budget-buddy-backend-neon.vercel.app/api/v1/transcations/delete-transcations",{transcationId:record._id});
      setLoading(false);
      message.success("Transcation Deleted Successfully");
     } catch (error) {
       setLoading(false);
      console.log(error);
      message.error("Unable to Delete Transcation")
     }finally{
      window.location.reload();
     }
}
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if(editable){
          await axios.post("https://budget-buddy-backend-neon.vercel.app/api/v1/transcations/edit-transcations", {
        payload:{
          ...values,
          userId:user._id
        },
        transcationId:editable._id
      });
      setLoading(false);
      message.success("Transcation Updated Successfully")
      }else{
        await axios.post("https://budget-buddy-backend-neon.vercel.app/api/v1/transcations/add-transcations", {
        ...values,
        userid: user._id
      });
        setLoading(false);
        message.success("Transcation Added Successfully")
      }
      setShowModal(false);
      setEditable(null);
      getAllTranscations();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Failed to add Transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <Space size={12}>
          <h4 className='selection'>Select Frequency</h4>
          <Select value={frequency} onChange={(val) => setFrequency(val)}>
            <Select.Option value="7">LAST WEEK</Select.Option>
            <Select.Option value="30">LAST MONTH</Select.Option>
            <Select.Option value="365">LAST YEAR</Select.Option>
            <Select.Option value="custom">CUSTOM</Select.Option>
          </Select>
             <h4 className='selection'>Select Type</h4>
          <Select value={type} onChange={(val) => setType(val)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expenses">EXPENSES</Select.Option>
          </Select>
          {frequency==="custom" && <RangePicker value={selectedDate} onChange={(values)=>setSelectDate(values)}/>}
          </Space>
        </div>
          <div className='icon-container'>
          <UnorderedListOutlined  className={`graph ${viewData==="table"?'active-icons':"inactive-icons"}`}onClick={()=>setViewData('table')}/>
         <AreaChartOutlined  className={`graph ${viewData==="chart"?'active-icons':"inactive-icons"}`}  onClick={()=>setViewData('chart')}/>
        </div>
        <Button style={{color:"white", backgroundColor:"green", width:"5rem"}} onClick={() => setShowModal(true)}>Add New</Button>
       </div>
      <div className='content'>
       {viewData==="table"? <Table columns={columns} dataSource={allTranscations} />:<Chart allTranscations={allTranscations} />}
      </div>

      <Modal title={editable ? "Edit Transcations":" Add Transcations"}open={showModel} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type='number' />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expenses</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='others'>Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text' />
          </Form.Item>
          <Button type="primary" htmlType='submit'>Save</Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
