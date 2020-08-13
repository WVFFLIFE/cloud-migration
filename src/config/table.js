import React from 'react';
import { styled } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Button, TableCell } from '@material-ui/core';
import Tooltip from '../components/Tooltip';
import format from 'date-fns/format';

const Action = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  background: 'none',
  border: 0,
  cursor: 'pointer',
  transition: '.15s linear',
  textTransform: 'capitalize',
  outline: 'none',
  '&:hover': {
    background: 'rgba(191, 95, 103, .1)',
    borderRadius: 3
  }
})

const Paragraph = styled('p')({
  margin: 0,
  marginBottom: 5,
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '19px',
  color: '#192B5D',
  '&:last-child': {
    marginBottom: 0
  }
});

const CustomText = styled('span')({
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '19px',
  color: '#192B5D'
})

const StyledCloseIcon = styled(HighlightOffIcon)({
  marginRight: 5,
  fontSize: '1.1rem',
  color: '#BF5F67'
})

const ButtonText = styled('span')({
  fontSize: 14,
  lineHeight: '19px',
  fontWeight: 400,
  color: '#BF5F67'
})

const EntityName = styled('span')({
  fontSize: 14,
  fontWeight: 400,
  fontFamily: 'Segoe UI',
  color: '#192B5D'
});

const TechnicalName = styled('span')({
  fontSize: 14,
  fontWeight: 400,
  fontFamily: 'Segoe UI',
  color: '#192B5D'
})

const Status = styled('span')({
  display: 'inline-block',
  padding: '5px 12px',
  fontSize: 10,
  fontFamily: 'Segoe UI',
  fontWeight: 600,
  lineHeight: '14px',
  borderRadius: 13,
  textTransform: 'uppercase'
})

const DraftStatus = styled(Status)({
  background: '#EAE9ED',
  color: '#7886AE',
})

const ScheduledStatus = styled(Status)({
  background: '#D9EEFF',
  color: '#2E83DD',
})

const StartedStatus = styled(Status)({
  background: '#FFF8D9',
  color: '#FFB034'
})

const InvolvementNedeedStatus = styled(Status)({
  background: '#FFB8C7',
  color: '#C4001A'
})

const CompletedStatus = styled(Status)({
  background: '#DAF6CD',
  color: '#2F9033'
})

const EntityTableCell = styled(TableCell)({
  padding: '19px 24px'
});

const JobsListTableCell = styled(TableCell)({
  padding: '19px 24px',
  fontSize: 0,
  borderBottom: '1px solid #EAE9ED'
})

const ValidateTableCell = styled(TableCell)({
  width: 144,
  padding: '19px 24px'
})

const StatusBlockWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const ErrorBlockText = styled('span')({
  fontSize: 14,
  color: '#BF5F67',
  textDecoration: 'underline',
  textTransform: 'capitalize'
})

const SuccessBlockText = styled('span')({
  fontSize: 14,
  color: '#A1ADCE'
})

const ErrorIcon = styled(HighlightOffIcon)({
  marginRight: 8,
  fontSize: '1.1rem',
  color: '#BF5F67'
})

const SuccessIcon = styled(CheckCircleOutlineIcon)({
  marginRight: 8,
  fontSize: '1.1rem',
  color: '#A1ADCE'
})

export const jobsTableBaseConfig = {
  initOrder: 'asc',
  initOrderBy: 'name',
  cellsList: [
    {
      fieldName: 'name',
      label: 'Organization',
      renderItem: (data) => (
        <JobsListTableCell>
          <CustomText>{data}</CustomText>
        </JobsListTableCell>
      ),
      activeSort: true
    },
    {
      fieldName: 'datasize',
      label: 'Data size',
      renderItem: (data) => (
        <JobsListTableCell>
          <CustomText>{`${data} Mb`}</CustomText>
        </JobsListTableCell>
      ),
      activeSort: true
    },
    {
      fieldName: 'estimatedDuration',
      label: 'Duration',
      renderItem: (data) => (
        <JobsListTableCell>
          <CustomText>{data}</CustomText>
        </JobsListTableCell>
      ),
      activeSort: true
    },
    {
      fieldName: 'scheduledDate',
      label: 'Scheduled Date',
      renderItem: (data) => (
        <JobsListTableCell>
          <CustomText>
            {format(new Date(data), 'dd/MM/yyyy')}
          </CustomText>
        </JobsListTableCell>

      ),
      activeSort: true
    },
    {
      fieldName: 'status',
      label: 'Status',
      renderItem: (data) => {
        return (
          <JobsListTableCell>
            {data === 'Draft' ? <DraftStatus>{data}</DraftStatus> :
              data === 'Scheduled' ? <ScheduledStatus>{data}</ScheduledStatus> :
                data === 'Started' ? <StartedStatus>{data}</StartedStatus> :
                  data === 'Involvement needed' ? <InvolvementNedeedStatus>{data}</InvolvementNedeedStatus> :
                    data === 'Completed' ? <CompletedStatus>{data}</CompletedStatus> :
                      <CustomText>{data}</CustomText>}
          </JobsListTableCell>
        )
      },
      activeSort: true
    },
    {
      fieldName: 'notifications',
      label: 'Notifications',
      renderItem: (data) => {
        return (
          <JobsListTableCell>
            {Array.isArray(data) ? data.map((item, index) => (
              <Paragraph key={index}>{item.text}</Paragraph>
            )) : null}
          </JobsListTableCell>
        )
      },
      activeSort: true
    },
    {
      fieldName: 'action',
      label: 'Action',
      renderItem: (handleAction) => (data = null) => (
        <JobsListTableCell>
          <Action
            type="button"
            onClick={(e) => handleAction(e, data)}
          >
            <StyledCloseIcon />
            <ButtonText>Cancel</ButtonText>
          </Action>
        </JobsListTableCell>

      ),
      activeSort: false
    }
  ]
};

export const entitiesTableConfig = {
  cellsList: [
    {
      fieldName: 'displayName',
      label: 'Entity Name',
      renderItem: (data) => (
        <EntityTableCell>
          <EntityName>{data}</EntityName>
        </EntityTableCell>

      ),
      activeSort: true
    },
    {
      fieldName: 'logicalName',
      label: 'Entity Technical Name',
      renderItem: (data) => (
        <EntityTableCell>
          <TechnicalName>{data}</TechnicalName>
        </EntityTableCell>

      ),
      activeSort: true
    },
    {
      fieldName: 'description',
      label: 'Description',
      renderItem: (data) => (
        <EntityTableCell>
          <TechnicalName>{data}</TechnicalName>
        </EntityTableCell>
      ),
      activeSort: true
    },
    {
      fieldName: 'validationSettings',
      label: 'Validate Status',
      activeSort: true,
      renderItem: (data) => {
        if (!data) return <ValidateTableCell></ValidateTableCell>

        const { status, message } = data;
        const emptyCell = (<ValidateTableCell></ValidateTableCell>);
        const successCell = (
          <ValidateTableCell>
            <StatusBlockWrapper>
              <SuccessIcon />
              <SuccessBlockText>Success</SuccessBlockText>
            </StatusBlockWrapper>
          </ValidateTableCell>
        );
        const errorBlock = (
          <ValidateTableCell>
            <Tooltip
              title="Failed"
              description={message}
              placement="left-start"
              interactive
            >
              <StatusBlockWrapper>
                <ErrorIcon />
                <ErrorBlockText>Failed</ErrorBlockText>
              </StatusBlockWrapper>
            </Tooltip>
          </ValidateTableCell>
        )

        return status === 'hidden'
          ? emptyCell :
          status === 'success'
            ? successCell :
            status === 'error'
              ? errorBlock :
              emptyCell;
      },
      
    }
  ]
}