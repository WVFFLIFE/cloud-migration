import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  fetchEntities, validateEntities,
  setOrderBy, setOrder,
  setCurrentPage, setValidationInit
} from '../actions';
import EntitiesStepView from '../components/EntitiesStepView';

const EntitiesStep = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading, data, itemsPerPage,
    order, orderBy, currentPage,
    totalItems
  } = useSelector(state => state.entities);
  const { entities: validationData } = useSelector(state => state.validation);

  useEffect(() => {
    dispatch(fetchEntities(id))

    /* eslint-disable-next-line */
  }, [id, currentPage, itemsPerPage, order, orderBy])

  const handleValidate = (list, flag) => {
    dispatch(validateEntities(id, list, flag))
  }

  const setPage = (page) => {
    dispatch(setCurrentPage(page));
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    batch(() => {
      dispatch(setOrder(isAsc ? 'desc' : 'asc'));
      dispatch(setOrderBy(property));
    })
  }

  const setInitialStepValidation = () => {
    dispatch(setValidationInit('entities'))
  }

  return (
    <EntitiesStepView
      loading={loading}
      data={data}
      handleValidate={handleValidate}
      validationData={validationData}
      order={order}
      orderBy={orderBy}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      handleRequestSort={handleRequestSort}
      setPage={setPage}
      totalItems={totalItems}
      setInitialStepValidation={setInitialStepValidation}
    />
  )
}

export default EntitiesStep;