import React from 'react';
import {useHistory} from 'react-router-dom';
import {
  styled,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableBodyLoader,
  JobsTableRow
} from '../Table';
import { useOrder } from '../../hooks';
import { jobsTableBaseConfig } from '../../config';
import { stableSort, getComparator } from '../../helpers';

const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20
})

const Title = styled('h2')({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  color: '#3A3A45',
})

const AddButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 10px',
  border: '1px solid #E05D2A'
})

const AddButtonText = styled('span')({
  fontFamily: 'Segoe UI',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '20px',
  color: '#E05D2A',
  textTransform: 'uppercase'
})

const AddButtonIcon = styled(AddIcon)({
  marginRight: 5,
  color: '#E05D2A'
})

const JobsListView = ({
  data,
  loading,
  handleJobDelete,
  handleAddJob
}) => {
  const history = useHistory();
  const { initOrder, initOrderBy } = jobsTableBaseConfig;
  const {
    order,
    orderBy,
    handleRequestSort
  } = useOrder({ initOrder, initOrderBy })

  const handleJobClick = (event, id) => history.push(`/migrationjob/${id}`);

  const cellsList = jobsTableBaseConfig.cellsList.map(cellItem => ({
    ...cellItem,
    renderItem: cellItem.fieldName === 'action' ? 
      cellItem.renderItem(handleJobDelete) : 
      cellItem.renderItem
  }));

  const renderRows = () => {
    return stableSort(data, getComparator(order, orderBy)).map(item => {
      return (
        <JobsTableRow
          key={item.id}
          data={item}
          cellsList={cellsList}
          handleRowClick={handleJobClick}
        />
      )
    })
  }

  return (
    <>
      <Top>
        <Title>Jobs list</Title>
        <AddButton
          onClick={handleAddJob}
          type="button"
          disabled={loading}
        >
          <AddButtonIcon />
          <AddButtonText>Add</AddButtonText>
        </AddButton>
      </Top>
      <Table>
        <TableHead 
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          loading={loading}
          cellsList={cellsList}
          type="jobs"
        />
        {loading ? (
          <TableBodyLoader 
            rows={3}
            cellsList={cellsList}
          />
        ) : (
          <TableBody 
            renderRows={renderRows}
          />
        )}
      </Table>
    </>
  )
}

export default JobsListView;