import React from 'react';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TableCell } from '@material-ui/core';
import SuccessBlock from '../components/SuccessBlock';
import ErrorBlock from '../components/ErrorBlock';
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
    background: '#DCDCDC',
    borderRadius: 3
  }
})

const Paragraph = styled('p')({
  margin: 0,
  marginBottom: 5,
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '20px',
  color: '#757588',
  '&:last-child': {
    marginBottom: 0
  }
});

const CustomText = styled('span')({
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '20px',
  color: '#3A3A45'
})

const StyledCloseIcon = styled(CloseIcon)({
  marginRight: 5,
  fontSize: '1.1rem',
  color: '#201F1E'
})

const ButtonText = styled('span')({
  fontSize: 12,
  lineHeight: '20px',
  fontWeight: 600,
  color: '#1F2E5F'
})

const EntityName = styled('span')({
  fontSize: 13,
  fontWeight: 400,
  fontFamily: 'Segoe UI',
  color: '#302846'
});

const TechnicalName = styled('span')({
  fontSize: 13,
  fontWeight: 400,
  fontFamily: 'Segoe UI',
  color: '#605E5C'
})

const DraftStatus = styled('span')({
  display: 'inline-block',
  padding: '2px 8px',
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  borderRadius: 10,
  background: '#F3F2F1',
  color: '#3A3A45'
})

const ScheduledStatus = styled('span')({
  display: 'inline-block',
  padding: '2px 8px',
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  borderRadius: 10,
  background: '#D9EEFF',
  color: '#00006F'
})

const StartedStatus = styled('span')({
  display: 'inline-block',
  padding: '2px 8px',
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  borderRadius: 10,
  background: '#FFF4CE',
  color: '#A88200'
})

const InvolvementNedeedStatus = styled('span')({
  display: 'inline-block',
  padding: '2px 8px',
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  borderRadius: 10,
  background: '#FDE7E9',
  color: '#8F000D'
})

const CompletedStatus = styled('span')({
  display: 'inline-block',
  padding: '2px 8px',
  fontSize: 12,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  borderRadius: 10,
  background: '#DAF3DB',
  color: '#107C10'
})

const EntityTableCell = styled(TableCell)({
  padding: 6
});

const JobsListTableCell = styled(TableCell)({
  padding: 11.5
})

const ValidateTableCell = styled(TableCell)({
  width: 144,
  padding: '6px 12px'
})

const SuccessEntityTableCell = styled(ValidateTableCell)({
  background: 'rgba(95, 210, 85, 0.2)'
})

const ErrorEntityTableCell = styled(ValidateTableCell)({
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  background: 'rgba(250, 65, 0, 0.2)'
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
      renderItem: (handleAction) => (data) => {
        if (!data) return <ValidateTableCell></ValidateTableCell>

        const {status} = data;
        const emptyCell = (<ValidateTableCell></ValidateTableCell>);
        const successCell = (
          <SuccessEntityTableCell>
            <SuccessBlock />
          </SuccessEntityTableCell>
        );
        const errorBlock = (
          <ErrorEntityTableCell>
            <ErrorBlock 
              handleClick={handleAction}
            />
          </ErrorEntityTableCell>
        )

        return status === 'hidden' 
          ? emptyCell :
            status === 'success' 
          ? successCell :
            status === 'error'
          ? errorBlock :
            emptyCell;
      },
      activeSort: false
    }
  ]
}