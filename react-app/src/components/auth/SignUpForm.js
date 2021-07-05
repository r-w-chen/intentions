import React, { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Flex justify='center' align='center' w='100%' h='100%' p={5}>
    <FormControl as='form' onSubmit={onSignUp} bg='#ECECEC' w='50%' p={5} borderRadius='md' boxShadow='lg'>
      <div>
        <FormLabel>User Name</FormLabel>
        <Input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></Input>
      </div>
      <div>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></Input>
      </div>
      <div>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></Input>
      </div>
      <div>
        <FormLabel>Repeat Password</FormLabel>
        <Input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></Input>
      </div>
      <Button type="submit">Sign Up</Button>
    </FormControl>
    </Flex>
  );
};

export default SignUpForm;
