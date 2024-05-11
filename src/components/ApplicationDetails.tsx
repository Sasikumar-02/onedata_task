import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select, Button } from 'antd';
import { getApplications } from '../Redux/contactActions';
const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const {Option}= Select
  const applications:any = useSelector((state) => state); 
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusOptions, setStatusOptions]= useState<any[]>([]);
  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);
  useEffect(() => {
    const uniqueJobTitles = Array.from(new Set(applications.map((application:any) => application.jobTitle)));
    setStatusOptions(uniqueJobTitles);
  }, [applications]);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'About Me',
      dataIndex: 'aboutMe',
      key: 'aboutMe',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
  ];

  return (
    <>
     <div>
      <h1 style={{ textAlign: 'left', color:'#0B4266', margin:'30px 20px 20px 20px', fontFamily:'poppins' }}>Application Details</h1>
      <div style={{ display: 'flex', alignItems: 'left' }}>
        <Select
            showSearch
            style={{ width: 200, marginRight: 8, height: 40, marginLeft:'20px' }}
            placeholder="Filter by Status"
            onChange={(value) => setSelectedStatus(value)}
            value={selectedStatus}
        >
            <Option value={null}>All Statuses</Option>
            {statusOptions.map((status) => (
                <Option key={status} value={status}>
                    {status}
                </Option>
            ))}
        </Select>
        <Button type="default" onClick={()=>setSelectedStatus(null)} style={{ width: '100px', height: '40px' }}>Clear Filter</Button>
      </div>
      <Table
        columns={columns}
        dataSource={applications.filter((job:any) => selectedStatus ? job.jobTitle === selectedStatus : true) as ReadonlyArray<any>}
        scroll={{ x: 'max-content' }}
      />

    </div>
     
    </>
   

  );
};

export default ApplicationDetails;
