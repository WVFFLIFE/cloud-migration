import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_REPORTS,
  SET_SELECTED_ENTITIES,
  SET_INIT_SELECTED_ENTITIES,
  SET_TAB,
} from '../constants';
import {
  setValidationStart,
  setValidationSuccess,
  setValidationError,
} from '../actions'
import { batch } from 'react-redux';
import {httpClient} from '../services/migration.services';
import { zipListToObj } from '../helpers';

function modifyEntities(prevList, validationList) {
  const zipValidationList = zipListToObj(validationList, 'logicalName');
  return prevList.map(item => {
    const validationData = zipValidationList?.[item.logicalName];
    let validationSettings = { status: 'hidden', message: '' };

    if (!validationData) {
      return {
        ...item,
        validationSettings
      }
    } else if (!validationData.errors.length) {
      validationSettings = { status: 'success', message: 'Success!' }
    } else if (validationData.errors.length) {
      validationSettings = { status: "error", message: validationData.errors }
    }

    return {
      ...item,
      validationSettings
    }
  })
}

const fetchEntitiesStarted = () => ({
  type: FETCH_ENTITIES_DATA_STARTED
})

const fetchEntitiesSuccess = (list) => ({
  type: FETCH_ENTITIES_DATA_SUCCESS,
  payload: list
})

const setReports = (reports) => ({
  type: SET_REPORTS,
  payload: reports
})

export const setInitSelectedEntities = () => ({
  type: SET_INIT_SELECTED_ENTITIES
})

export const selectEntity = (entities) => ({
  type: SET_SELECTED_ENTITIES,
  payload: entities
})

export const setCurrentTab = (newTab) => ({
  type: SET_TAB,
  payload: newTab
})

export const setSelectedEntities = (selected) => {
  return (dispatch, getState) => {
    const { currentTab } = getState().entities;
    const selectedEntities = getState().entities.selectedEntities[currentTab];

    const newSelectedEntities = Array.isArray(selected)
      ? selected
      : selectedEntities.includes(selected)
        ? selectedEntities.filter(selectedEntity => selectedEntity !== selected)
        : [...selectedEntities, selected];

    dispatch(selectEntity(newSelectedEntities));
  }
}

export const fetchEntities = (id) => {
  return dispatch => {
    dispatch(fetchEntitiesStarted());

    httpClient
      .get(`/${id}/entities`)
      .then(({data}) => {
        let entities = data.entities;
        let selectedEntities = {};

        if (data?.checkedEntities.length) {
          const zipCheckedEntities = zipListToObj(data.checkedEntities, 'logicalName');
          selectedEntities = data.checkedEntities.reduce((acc, next) => {
            if (next.selected && acc?.[next.category]) {
              acc[next.category] = [...acc[next.category], next.logicalName];
            } else if (next.selected && !acc?.[next.category]) {
              acc[next.category] = [next.logicalName];
            }

            return acc;
          }, {});

          entities = data.entities.map(entity => {
            let validationSettings = { status: 'hidden', message: '' };
            if (zipCheckedEntities?.[entity.logicalName]) {
              const checkedEntity = zipCheckedEntities[entity.logicalName];

              validationSettings = checkedEntity.error 
                ? { status: 'error', message: [checkedEntity.error] }
                : { status: 'success', message: 'Success!' }
            }

            return {
              ...entity,
              validationSettings
            }
          })
        }

        dispatch(fetchEntitiesSuccess({data: entities, selectedEntities}))
      })
  }
}

export const validateEntities = (id, selectedEntities) => {
  return async (dispatch, getState) => {
    const body = { selectedEntities }
    const { data: currentEntities } = getState().entities;

    dispatch(setValidationStart('entities'));

    const { data: {reports, validationResult} } = await httpClient.post(`/${id}/entities/validate-entities`, body);
    const postValidationBody = reports.map(reportItem => {
      const entity = currentEntities.find(item => item.logicalName === reportItem.logicalName);
      const selected = selectedEntities.includes(reportItem.logicalName);

      return {
        displayName: entity?.displayName || '',
        logicalName: reportItem.logicalName,
        description: entity?.description || '',
        error: reportItem.errors.join(''),
        category: reportItem.group,
        selected
      }
    });
    await httpClient.post(`/${id}/entities`, {entities: postValidationBody});

    const newEntities = modifyEntities(currentEntities, reports);

    batch(() => {
      if (validationResult) {
        dispatch(setValidationSuccess('entities', 'Validation successful. No compatibility issues detected. Press “Next” to go further.'));
      } else {
        dispatch(setValidationError('entities', 'Detected compatibility issues with target environment'));
      }
      dispatch(fetchEntitiesSuccess({data: newEntities, selectedEntities: {}}))
      dispatch(setReports(reports));
    })
  }
}