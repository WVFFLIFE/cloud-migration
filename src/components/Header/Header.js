import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import logo from '../../assets/images/logo.svg';
import clsx from 'clsx';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles({
  logo: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto'
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  listItem: {
    marginRight: 25,
    padding: '4px 5px',
    '&:last-child': {
      marginRight: 0,
      padding: 0,
      background: '#e05d2a',
      '& a': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '4px 10px',
        paddingRight: 30.5,
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1,
        color: '#fff',
        '&::before': {
          display: 'none'
        }
      }
    }
  },
  link: {
    position: "relative",
    fontSize: 15,
    fontFamily: 'Gilroy',
    fontWeight: 900,
    color: '#757588',
    textDecoration: 'none',
    textTransform: 'uppercase',
    '&:hover::before': {
      transform: 'scale(1,1)'
    },
    '&::before': {
      content: "''",
      position: 'absolute',
      display: 'block',
      left: 0,
      right: 0,
      bottom: -3,
      height: 3,
      background: '#e05d2a',
      transform: 'scale(0,1)',
      transition: 'transform 250ms ease-in-out,-webkit-transform 250ms ease-in-out'
    }
  },
  linkActive: {
    '&:hover::before': {
      transform: 'scale(1,1)'
    },
    '&::before': {
      transform: 'scale(1,1)'
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 24
  },
  arrow: {
    marginLeft: 5
  }
})

const menu = [
  {
    title: 'Home',
    to: 'https://uds.systems'
  },
  {
    title: 'Our cases',
    to: 'https://uds.systems/cases'
  },
  {
    title: 'Add-ons',
    to: 'https://uds.systems/add-ons'
  },
  {
    title: 'Migration',
    to: '/'
  },
  {
    title: 'Blog',
    to: 'https://uds.systems/blog'
  },
  {
    title: 'Contact us',
    to: 'https://uds.systems/contact-us'
  },
  {
    title: 'Book a call',
    to: 'https://calendly.com/rsavran/dynamics'
  }
]

const Header = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.row}>
        <div>
          <img
            className={classes.logo}
            src={logo}
            alt="UDS"
          />
        </div>
        <div>
          <ul className={classes.list}>
            {
              menu.map((item, idx) => {
                const isLast = menu.length - 1 === idx;

                return (
                  <li
                    key={item.title}
                    className={classes.listItem}
                  >
                    {
                      item.to === '/' ? <span className={clsx(classes.link, classes.linkActive)}>{item.title}</span> : (
                        <a
                          className={classes.link}
                          href={item.to}
                        >
                          {
                            isLast ? (
                              <>
                              <span>
                                {item.title}
                              </span>
                              <TrendingFlatIcon className={classes.arrow}/>
                              </>
                            ) : item.title
                          }
                        </a>
                      )
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;