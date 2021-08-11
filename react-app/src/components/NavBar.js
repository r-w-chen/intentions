import React from 'react';
import { Link, Flex, Box, Image} from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import styles from '../css.modules/Navbar.module.css'
import logo from '../images/Intentions-logo.png';
const navLinkHover = {
  borderBottom: '3px solid #385170'
}

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className={styles.nav}>
      <Flex h={50} justify="space-between" alignItems='center' >
        <Flex>
          <Link as={NavLink} to="/" exact={true} activeClassName="active-logo" m={5}>
            <Image h={30} src={logo} alt='logo.png'/>
          </Link>
        </Flex>

        {user ?
          <LogoutButton />
        :
        <>
          <Box h='100%'>
          <Link as={NavLink} to="/login" exact={true} activeClassName="active-navbar"
           display='inline-block' pt={3} m='0px 10px' h='100%' transition='100ms'
           _hover={navLinkHover}
           >
            Login
          </Link>
          <Link as ={NavLink} to="/sign-up" exact={true} activeClassName="active-navbar"
           display='inline-block' h='100%' pt={3} m='0px 10px'
           _hover={navLinkHover}
           >
            Sign Up
          </Link>
          </Box>

        </>
        }
      </Flex>
    </nav>
  );
}

export default NavBar;
