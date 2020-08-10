import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapDragView from '../components/MapDragView';
import {
  setToTeamsTarget,
  removeTeamsTarget,
  setToTeamsSource,
  runTeamsAutomap,
  fetchTeams
} from '../actions';

const MapTeamsStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(fetchTeams(id))
    /* eslint-disable-next-line */
  }, []);

  const handleSetToSource = (sourceIndex, target) => {
    dispatch(setToTeamsSource(sourceIndex, target))
  }

  const handleRemoveFromSource = (target) => {
    dispatch(removeTeamsTarget(target))
  }

  const handleDragToTarget = (guid, items) => {
    dispatch(setToTeamsTarget(guid, items))
  }

  const handleAutomap = () => {
    dispatch(runTeamsAutomap());
  }

  return (
    <MapDragView
      loading={loading}
      targetList={data.targetTeams}
      sourceList={data.sourceTeams}
      mappedList={data.mapedTeams}
      handleSetToSource={handleSetToSource}
      handleRemoveFromSource={handleRemoveFromSource}
      handleDragToTarget={handleDragToTarget}
      handleAutomap={handleAutomap}
      title="Please map teams. Drag and Drop Active team from Target system to each record from Source system."
      filterField="name"
      type="team"
    />
  )
}

export default MapTeamsStep;