import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import {makeStyles, styled} from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { routeConfig } from '../../config';

const BreadcrumbsContainer = styled('div')({
  padding: '15px 24px',
  paddingBottom: 0
})

const Text = styled(Typography)({
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '14px',
  color: '#757588'
});

const NavigateIcon = styled(NavigateNextIcon)({
  fontSize: '1.1rem'
});

const StyledLink = styled(Link)({
  display: 'block',
  fontSize: 14,
  fontFamily: 'Segoe UI',
  fontWeight: 400,
  lineHeight: '14px',
  color: '#757588'
})

const useStyles = makeStyles(() => ({
  separator: {
    marginLeft: 4,
    marginRight: 4
  }
}))

const Breadcrumbs = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathList = location.pathname.split('/').map(s => s || 'home');

  return (
    <BreadcrumbsContainer>
      <MuiBreadcrumbs
        classes={{
          separator: classes.separator
        }}
        aria-label="breadcrumb"
        separator={<NavigateIcon/>}
      >
        {
          pathList.map((path, index) => {
            const options = path in routeConfig ? routeConfig[path] : {label: path, static: true};
            const isLast = pathList.length - 1 === index;

            return options.static || isLast ? (
              <Text key={path}>{options.label}</Text>
            ) : (
                <StyledLink to={options.to} key={path}>{options.label}</StyledLink>
              )
          })
        }
      </MuiBreadcrumbs>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs;