import React, { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/dashboard/home" />;
  }

  return (
    <Flex justify='center' align='center' w='100%' h='100%' p={5}>
      <FormControl as='form' onSubmit={onLogin} bg='#ECECEC' w='50%' p={5} borderRadius='md' boxShadow='lg'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <Button type="submit">Login</Button>
          <Button onClick={demoLogin}>Demo Login</Button>
        </div>
      </FormControl>
    </Flex>
  );
};

export default LoginForm;
