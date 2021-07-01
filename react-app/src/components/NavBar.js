import React from 'react';
import { Link } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import { Flex } from "@chakra-ui/react"
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <Flex justify="space-between">
          <Link as={NavLink} to="/" exact={true} activeClassName="active">
            Intentions
          </Link>
          {/* <Spacer /> */}
        {user ?
          <LogoutButton />
        :
        <>

          <Link as={NavLink} to="/login" exact={true} activeClassName="active">
            Login
          </Link>
     
   
          <Link as ={NavLink} to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </Link>

        </>
        }
      </Flex>
    </nav>
  );
}

export default NavBar;
