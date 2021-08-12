import React, { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Button, Text} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import Footer from '../Footer';

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
        <Text textAlign='center' fontSize={24} pb={3} borderBottom='2px solid #385170'>Login</Text>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <FormLabel mt='20px' htmlFor="email">Email</FormLabel>
          <Input
            id='email'
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
        </div>
          <Flex justify='flex-end' m={3}>
          <Button type="submit" bg='#385170' color='#ECECEC' borderRadius='full' m={2}
             _hover={{ bg: '#142D4C'}}
             _active={{ bg: '#385170'}}
          >
            Login
          </Button>
          <Button bg='#385170' color='#ECECEC' borderRadius='full' m={2}
             _hover={{ bg: '#142D4C'}}
             _active={{ bg: '#385170'}}
             onClick={demoLogin}
             >Demo Login
          </Button>
          </Flex>
      </FormControl>
      <Footer />
    </Flex>
  );
};

export default LoginForm;
