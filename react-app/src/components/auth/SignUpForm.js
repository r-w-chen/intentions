import React, { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Button, Text} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { parseErrors } from "./LoginForm";
import styles from '../../css.modules/Errors.module.css';
import Footer from '../Footer';

const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let data = await dispatch(signUp(username, email, password));
      if(data.errors){
        let errors = parseErrors(data.errors);
        setErrors(errors);
      } else {

        history.push('/dashboard/home')
      }
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
      <Text textAlign='center' fontSize={24} pb={3} borderBottom='2px solid #385170'>Sign Up</Text>
      <ul className={styles.errorContainer}>
          {errors.map((error) => (
            <li className={styles.authErrorMsg}>{error}</li>
          ))}
        </ul>
      <div>
        <FormLabel mt='5px' htmlFor='username'>User Name</FormLabel>
        <Input
          type="text"
          id="username"
          onChange={updateUsername}
          value={username}
          required={true}
          ></Input>
      </div>
      <div>
        <FormLabel htmlFor='signup-email'>Email</FormLabel>
        <Input
          type="email"
          id="signup-email"
          onChange={updateEmail}
          required={true}
          value={email}
        ></Input>
      </div>
      <div>
        <FormLabel htmlFor='signup-pw'>Password</FormLabel>
        <Input
          type="password"
          id="signup-pw"
          onChange={updatePassword}
          required={true}
          value={password}
        ></Input>
      </div>
      <div>
        <FormLabel htmlFor='confirm-pw'>Repeat Password</FormLabel>
        <Input
          type="password"
          id="confirm-pw"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></Input>
      </div>
      <Flex justify='flex-end'>
        <Button type="submit" bg='#385170' color='#ECECEC' borderRadius='full' m={2}
          _hover={{ bg: '#142D4C'}}
          _active={{ bg: '#385170'}}
        >
          Sign Up
        </Button>
      </Flex>
    </FormControl>
    <Footer />
    </Flex>
  );
};

export default SignUpForm;
