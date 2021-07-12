import React from "react";
import { Button } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <Button transition='100ms' borderRadius='full' bg='#385170' color='#ECECEC' m='0 10px'
  _hover={{bg:'#142D4C'}}
  onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
