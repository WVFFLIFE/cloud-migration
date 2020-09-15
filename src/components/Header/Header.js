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
      padding: '4px 5px',
      background: '#e05d2a',
      '& a': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        minHeight: 24,
        padding: '4px 50px 4px 5px',
        '&::before': {
          display: 'none'
        }
      }
    }
  },
  link: {
    display: "block",
    position: "relative",
    fontSize: 15,
    fontFamily: 'Gilroy',
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
    marginTop: 3,
    borderBottom: '3px solid #e05d2a',
    '&:hover::before': {
      display: 'none'
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 100
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: 'translateY(-50%)',
    color: '#fff'
  },
  navbarBrand: {
    display: 'block',
    paddingTop: 32,
    paddingBottom: 23
  },
  bookACall: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 1,
    color: '#fff',
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
    <div className="container max-width">
      <div className={classes.row}>
        <div>
          <a href="https://uds.systems/" target="_blank" rel="noopener noreferrer" className={classes.navbarBrand}>
            <img
              className={classes.logo}
              src={logo}
              alt="UDS"
            />
          </a>
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
                      item.to === 'https://uds.systems/add-ons' ? <span className={clsx(classes.link, classes.linkActive)}>{item.title}</span> : (
                        <a
                          className={classes.link}
                          href={item.to}
                        >
                          {
                            isLast ? (
                              <>
                                <span className={classes.bookACall}>
                                  {item.title}
                                </span>
                                <TrendingFlatIcon className={classes.arrow} />
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