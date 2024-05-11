import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
interface JobList{
  job_id: string;
  jobTitle: string;
  companyName: string;
  experienceRequired: string;
  skillsRequired: string;
  description: string;
}

const JobDetails = () => {
  const navigate = useNavigate();
  const jobData: JobList[]=[
    {
      job_id: '1',
      jobTitle: 'Frontend Developer',
      companyName: 'OneData Solution',
      experienceRequired: '2+ years',
      skillsRequired: 'React, JavaScript, HTML, CSS, Typescript, Redux, Next Js',
      description: 'We are looking for a skilled Frontend Developer to join our team...',
    },
    {
      job_id: '2',
      jobTitle: 'Backend Developer',
      companyName: 'Visai Labs',
      experienceRequired: '3+ years',
      skillsRequired: 'Node.js, Express, MongoDB, Java, PostreSQL',
      description: 'Join our Backend Development team and work on exciting projects...',
    },
    {
      job_id: '3',
      jobTitle: 'Devops Engineer',
      companyName: 'PQR Tech',
      experienceRequired: '4+ years',
      skillsRequired: 'Docker, Kubernetes, AWS, CI/CD',
      description: 'We are hiring a Devops Engineer to streamline our deployment process...',
    },
    {
      job_id: '4',
      jobTitle: 'Data Engineer',
      companyName: 'Data Corporation',
      experienceRequired: '3+ years',
      skillsRequired: 'Python, SQL, Data Warehousing',
      description: 'Join our Data Engineering team and work with large datasets...',
    },
  ];

  const handleJobApply = (record:any)=>{
    console.log("record", record);
    let jobId=record.job_id;
    let jobTitle= record.jobTitle;
    navigate('/applyjobs', {state:{job_id: jobId, jobTitle:jobTitle}})
  }
  const columns: ColumnsType<JobList> = [
    {
      title: 'Sl. No',
      dataIndex: 'slNo',
      key: 'slNo',
      width: '100px', 
      fixed: 'left',
      render: ( index) => index + 1,
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      width: 'max-content', 
      key: 'jobTitle',
      fixed: 'left',
    },
    {
      title: 'Name of the Company',
      dataIndex: 'companyName',
      width: 'max-content',
      key: 'companyName',
      fixed: 'left',
    },
    {
      title: 'Experience Required',
      dataIndex: 'experienceRequired',
      key: 'experienceRequired',
      width: 'max-content',
      fixed: 'left',
    },
    {
      title: 'Skills Required',
      dataIndex: 'skillsRequired',
      key: 'skillsRequired',
      width: 'max-content',
      fixed: 'left',
    },
    {
      title: 'Job Description',
      dataIndex: 'description',
      key: 'description',
      width: 'max-content',
      fixed: 'left',
    },
    {
      title: 'Actions',
      width: '120px',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      render: (_: any, record: JobList) => (
        <Button onClick={()=>handleJobApply(record)} style={{width:'100%', color:'white', background:'#0b4266'}}>Apply</Button>
      ),
    },  
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'left', color:'#0B4266', margin:'30px 20px 20px 20px', fontFamily:'poppins' }}>Job Details</h1>
      <Table
        columns={columns}
        dataSource={jobData}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default JobDetails;
