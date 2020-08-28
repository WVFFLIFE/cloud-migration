import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  styled,
  Button,
  makeStyles
} from '@material-ui/core';
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
import ConfirmationDialog from '../ConfirmationDialog';

const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 40
})

const Title = styled('h2')({
  margin: 0,
  fontSize: 32,
  fontWeight: 700,
  color: '#192B5D',
})

const Wrapper = styled('div')({
  paddingTop: 45,
  paddingBottom: 45
})

const useStyles = makeStyles({
  label: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: 'bold',
    lineHeight: '21px',
    color: '#fff',
    textTransform: 'none'
  },
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'auto',
    padding: '12.5px 19px',
    background: '#192B5D',
    borderRadius: 6
  },
  tableRoot: {
    background: '#fff',
    boxShadow: '0 16.6px 29.6px 0 rgba(161,173,206,0.22)'
  }
})

const JobsListView = ({
  data,
  loading,
  handleJobDelete,
  handleAddJob
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { initOrder, initOrderBy } = jobsTableBaseConfig;
  const {
    order,
    orderBy,
    handleRequestSort
  } = useOrder({ initOrder, initOrderBy });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);

  const handleJobClick = (event, id) => history.push(`/migrationjob/${id}`);

  const handleConfirmationOpen = (e, id) => {
    e.stopPropagation();
    setConfirmationOpen(true);
    setConfirmationId(id);
  }

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setConfirmationId(null);
  }

  const handleConfirmationSuccess = () => {
    setConfirmationOpen(false);
    handleJobDelete(confirmationId);
  }

  const cellsList = jobsTableBaseConfig.cellsList.map(cellItem => ({
    ...cellItem,
    renderItem: cellItem.fieldName === 'action' ?
      cellItem.renderItem(handleConfirmationOpen) :
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
    <Wrapper>
      <div className="container">
        <Top>
          <Title>Jobs list</Title>
          <Button
            classes={{
              root: classes.root,
              label: classes.label
            }}
            onClick={handleAddJob}
            type="button"
            disabled={loading}
          >
            Add Job
        </Button>
        </Top>
        <Table
          classes={{
            root: classes.tableRoot
          }}
        >
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
        <ConfirmationDialog 
          open={confirmationOpen}
          handleClose={handleConfirmationClose}
          handleSuccess={handleConfirmationSuccess}
        />
      </div>
    </Wrapper>
  )
}

export default JobsListView;