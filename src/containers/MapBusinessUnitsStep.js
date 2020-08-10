import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapDragView from '../components/MapDragView';
import {
  fetchBusinessUnits,
  setToBusinessUnitsSource,
  removeBusinessUnitsTarget,
  setToBusinessUnitsTarget,
  runBusinessUnitsAutomap
} from '../actions';

const MapBusinessUnitsStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.businessunits);

  useEffect(() => {
    dispatch(fetchBusinessUnits(id))
    /* eslint-disable-next-line */
  }, [id]);

  const handleSetToSource = (sourceIndex, target) => {
    dispatch(setToBusinessUnitsSource(sourceIndex, target))
  }

  const handleRemoveFromSource = (target) => {
    dispatch(removeBusinessUnitsTarget(target))
  }

  const handleDragToTarget = (guid, items) => {
    dispatch(setToBusinessUnitsTarget(guid, items))
  }

  const handleAutomap = () => {
    dispatch(runBusinessUnitsAutomap());
  }

  return (
    <MapDragView
      loading={loading}
      targetList={data.targetBusinessUnits}
      sourceList={data.sourceBusinessUnits}
      mappedList={data.mapedBusinessUnits}
      handleSetToSource={handleSetToSource}
      handleRemoveFromSource={handleRemoveFromSource}
      handleDragToTarget={handleDragToTarget}
      handleAutomap={handleAutomap}
      title="Please map business units. Drag and Drop Active units from Target system to each record from Source system."
      filterField="name"
      type="unit"
    />
  )
}

export default MapBusinessUnitsStep;