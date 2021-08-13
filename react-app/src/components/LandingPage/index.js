import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { Image, Flex, Button } from '@chakra-ui/react';
import logo from '../../images/Intentions.png';
import Footer from '../Footer';
import { login } from "../../store/session";
import styles from '../../css.modules/SideNav.module.css';

export default function LandingPage() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    if(user){
        return <Redirect to='/dashboard/home' />
    }

    const demoLogin = async (e) => {
        e.preventDefault();
        dispatch(login('demo@aa.io', 'password'));
      }
    return (
        <Flex flexDir='column' align='center' className={styles.dashboardContainer}>
            <Image  m={10} src={logo} alt='logo' w='900px'/>
            <Button w={300} bg='#385170' color='#ECECEC' borderRadius='full'
             _hover={{ bg: '#142D4C'}}
             _active={{ bg: '#385170'}}
             onClick={demoLogin}
             >Demo Login</Button>
             <Footer />
        </Flex>
    )
}
