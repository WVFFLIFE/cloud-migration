import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {fetchJobsList, deleteCurrentJob, addNewJob} from '../actions';
import JobsListView from '../components/JobsListView';

const JobsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {data, loading} = useSelector(state => state.jobsValue)

  useEffect(() => {
    dispatch(fetchJobsList(loading))
    /* eslint-disable-next-line */
  }, []);

  const handleJobDelete = (id) => {
    dispatch(deleteCurrentJob(id))
  }

  const pushTo = (path) => {
    history.push(path);
  }

  const handleAddJob = () => {
    dispatch(
      addNewJob(pushTo)
    );
  }

  return (
    <JobsListView 
      data={data}
      loading={loading}
      handleJobDelete={handleJobDelete}
      handleAddJob={handleAddJob}
    />
  )
}

export default JobsList