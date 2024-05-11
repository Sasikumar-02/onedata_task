import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, notification, Button,
    ConfigProvider,
    Form,
    Typography,
    ThemeConfig,
    } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import * as yup from 'yup';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import '../styles/ApplyJobs.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addJobs } from '../Redux/contactActions';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeftOutlined } from '@ant-design/icons';

  export interface ApplyJobs{
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    aboutMe: string;
    job_id: string;
    jobTitle: string;
  }

  const config: ThemeConfig = {
    token: {
      colorPrimary: "#0B4266",
      colorPrimaryBg: "#E7ECF0",
    },
  };

const ApplyJobs = () => {
   const location = useLocation();
   const navigate = useNavigate();
    const {job_id, jobTitle}= location.state||{};
    console.log("record", job_id, jobTitle);
    const [initialValue, setInitialValue] = useState<ApplyJobs>({
      id: uuidv4(),
      firstName: '',
      lastName: '',
      email: '',
      aboutMe: '',
      job_id: job_id,
      jobTitle: jobTitle
  });
    const dispatch = useDispatch();

  const handleFormSubmit = async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    try {
        const newJobs = { ...values, id: uuidv4() };
        dispatch(addJobs(newJobs));
        notification.success({
          message: 'Form Submitted Successfully',
          description: 'Jobs Applied successfully.',
        });
      resetForm(); 
    } catch (error) {
      notification.error({
        message: 'Form Submission Failed',
        description: 'There was an error submitting the form. Please try again later.',
      });
    }
  };
  
      
      const handleClearForm = (resetForm:any) => {
        resetForm(); 
      };
      const emailFormatRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const validationSchema = yup.object().shape({
        firstName: yup.string().min(2, 'First Name must be at least 2 characters').required('First Name is Required'),
        lastName: yup.string().required('Last Name is required'), 
        email: yup.string().email('Email must be in the format: xyz@gmail.com').required('Email is required').test(
          'valid-email-format',
          'Email must be in the format: xyz@gmail.com',
          (value) => emailFormatRegex.test(value)
        ),
        aboutMe: yup.string().required('About Me is required').matches(/^\S.*\S$/, 'About Me cannot start or end with whitespace')
        .test('no-whitespace', 'Whitespace only is not allowed', function (value) {
            return value && value.trim() !== '' ? true : new yup.ValidationError('Whitespace only is not allowed');
        })
        .max(1000, 'About me must be atmost 1000 characters long'),
        job_id: yup.string().required('Job ID is required'),
        jobTitle: yup.string().required('Job Title is required'),
      });
  return (
    <ConfigProvider theme={config}>
      <div className='applyjobs-main' style={{overflow:'hidden'}}>
        <div className='header' style={{display:'flex', flexDirection:'column'}}>
          <div>
          <h1 style={{marginLeft:'20px'}}><ArrowLeftOutlined   style={{ marginRight: '10px' }} onClick={()=>{navigate('/jobdetails')}} />Apply Jobs</h1>
          </div>
          <div>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize={true}
            >
            {({
              
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              isSubmitting,
              resetForm
            }) => 
          { console.log("values",values,errors)
            return (  
              <Form name='basic' layout='vertical' autoComplete='off' onFinish={handleSubmit}>
                <div>
                  <div style={{display:'flex'}}>
                    <Form.Item
                      label="First Name"
                      className="label-strong"
                      name="firstName"
                      required
                      style={{ padding: "10px" }}
                      >
                      <Input
                      style={{
                        height: "50px",
                        width: "470px",
                        borderRadius: "4px",
                        margin: "0px",
                      }}
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      <div>
                          <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                          >
                          <ErrorMessage name="firstName" /> 
                          </Typography.Text>
                      </div>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        className="label-strong"
                        name="lastName"
                        required
                        style={{ padding: "10px" }}
                        >
                        <Input
                        style={{
                          height: "50px",
                          width: "470px",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    <div>
                        <Typography.Text
                        type="danger"
                        style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                        <ErrorMessage name="lastName" /> 
                        </Typography.Text>
                    </div>
                    </Form.Item>
                  </div>
                  <div style={{display:'flex'}}>
                    <Form.Item
                      label="Email"
                      className="label-strong"
                      name="email"
                      required
                      style={{ padding: "10px" }}
                    >
                    <Input
                        style={{
                          height: "50px",
                          width: "470px",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div>
                          <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                          >
                          <ErrorMessage name="email" /> 
                          </Typography.Text>
                      </div>
                    </Form.Item>
                    <Form.Item
                      label="Job Title"
                      className="label-strong"
                      name="jobTitle"
                      required
                      style={{ padding: "10px" }}
                    >
                    <Input
                        style={{
                          height: "50px",
                          width: "470px",
                          borderRadius: "4px",
                          margin: "0px",
                          backgroundColor: "#f5f5f5",
                          cursor:'not-allowed'
                        }}
                        name="jobTitle"
                        defaultValue={jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly
                      />
                    </Form.Item>
                  </div>
                  <div style={{display:'flex'}}>
                    <Form.Item 
                      label="About Me"
                      className="label-strong"
                      name="aboutMe"
                      required
                      style={{ padding: "10px" }}
                    >
                      <TextArea
                        style={{
                          height: "150px",
                          width: "960px",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                        name="aboutMe"
                        value={values.aboutMe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div style={{ textAlign: "left" }}>
                              <Typography.Text type="danger" style={{ wordBreak: "break-word" }}>
                                  <ErrorMessage name="aboutMe" />
                              </Typography.Text>
                          </div>
                          <div style={{ textAlign: "right" }}>
                              <Typography.Text style={{ fontSize: "12px" }}>
                                  {values.aboutMe.length}/1000
                              </Typography.Text>
                          </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div style={{display:'flex', marginLeft:'738px'}}>
                    <Form.Item>
                      <Button
                        htmlType="button"
                        style={{ width: "100px", height: "41px", cursor: 'pointer', marginLeft:'0px'}}
                        className="Button"
                        id='cancel-applyjobs'
                        onClick={() => handleClearForm(resetForm)}
                      >
                        Clear
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%", height: "41px" , marginLeft:'10px', marginTop:'10px',cursor: Object.keys(errors).length > 0 || Object.values(values).some(value => value === '') ? 'not-allowed' : 'pointer', backgroundColor: Object.keys(errors).length > 0 || Object.values(values).some(value => value === '') ? '#ccc' : '#0b4266', color: 'white'}} 
                        disabled={Object.keys(errors).length > 0 || Object.values(values).some(value => value === '')} 
                        title={Object.keys(errors).length > 0 || Object.values(values).some(value => value === '')? 'Kindly fill all the required fields': ''} 
                        className="Button"
                      >
                        {isSubmitting ? 'Submitting...' :'Submit'}
                      </Button>
                    </Form.Item>
                  </div>
                </div>

            </Form>
            )}
            }  
            </Formik>
          </div>
          
        </div>
      </div>
    </ConfigProvider>
  )
}

export default ApplyJobs