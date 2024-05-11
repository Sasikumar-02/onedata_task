import { Reducer } from 'redux';
import { ApplyJobs } from '../components/ApplyJobs';

export const ADD_JOBS = 'ADD_JOBS';
export const GET_APPLICATIONS = 'GET_APPLICATIONS';
const initialState: ApplyJobs[] = [];

const contactReducer: Reducer<ApplyJobs[], ContactAction> = (state = initialState, action) => {
  switch (action.type) {
      case ADD_JOBS:
          const newState = [...state, action.payload];
          localStorage.setItem('applyjobs', JSON.stringify(newState));
          return newState;
      case GET_APPLICATIONS:
        const storedApplications = localStorage.getItem('applyjobs');
        if (storedApplications) {
          return JSON.parse(storedApplications);
        } else {
          return state;
        }
      default:
          return state;
  }
};

export const addJobs = (jobs: ApplyJobs) => ({
  type: ADD_JOBS,
  payload: jobs,
});
export const getApplications = () => ({
  type: GET_APPLICATIONS,
});

interface AddContactAction {
  type: typeof ADD_JOBS;
  payload: ApplyJobs;
}

interface GetApplicationsAction {
  type: typeof GET_APPLICATIONS;
}


type ContactAction = AddContactAction | GetApplicationsAction;

export default contactReducer;
