import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import MapUserView from '../components/MapDragView';
import {
  fetchUsers,
  setToSource,
  removeTarget,
  setToTarget,
  runAutomap
} from '../actions';

const MapUserStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {data, loading} = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers(id))
    /* eslint-disable-next-line */
  }, []);

  const handleSetToSource = (sourceIndex, target) => {
    dispatch(setToSource(sourceIndex, target))
  }

  const handleRemoveFromSource = (target) => {
    dispatch(removeTarget(target))
  }

  const handleDragToTarget = (guid, items) => {
    dispatch(setToTarget(guid, items))
  }

  const handleAutomap = () => {
    dispatch(runAutomap());
  }

  return (
    <MapUserView 
      loading={loading}
      targetList={data.targetUsers}
      sourceList={data.sourceUsers}
      mappedList={data.mapedUsers}
      handleSetToSource={handleSetToSource}
      handleRemoveFromSource={handleRemoveFromSource}
      handleDragToTarget={handleDragToTarget}
      handleAutomap={handleAutomap}
      title="Please map users. Drag and Drop Active users from Target system to each record from Source system."
      filterField="fullName"
      type="user"
    />
  )
}

export default MapUserStep;