import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import JobDetails from '../components/JobDetails';
import ApplyJobs from '../components/ApplyJobs';
import ApplicationDetails from '../components/ApplicationDetails';
import { ProjectLayout } from '../Layout';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<ProjectLayout/>}>
            <Route index path="/jobdetails" element={<JobDetails />} />
            <Route path="/applyjobs" element={<ApplyJobs />} />
            <Route path="/applicationdetails" element={<ApplicationDetails />} />
            <Route path="*" element={<Navigate to="/jobdetails" />} />
        </Route>
      
    </Routes>
  );
};

export default AppRoutes;
