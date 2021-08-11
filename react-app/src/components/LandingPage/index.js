import React from 'react'
import { Redirect } from 'react-router-dom'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai';
import { useSelector, useDispatch} from 'react-redux';
import { Image, Flex, Button, Icon } from '@chakra-ui/react';
import logo from '../../images/Intentions.png';
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
            <Image  m={10} src={logo} alt='logo' w='50%'/>
            <Button w={300} bg='#385170' color='#ECECEC' borderRadius='full'
             _hover={{ bg: '#142D4C'}}
             _active={{ bg: '#385170'}}
             onClick={demoLogin}
             >Demo Login</Button>
             <footer className={styles.footer}>
                <a href="https://r-w-chen.github.io/" target="_blank" rel="noreferrer">Created by Becky Chen</a>
                <a alignSelf='center' href='https://github.com/r-w-chen/intentions' target="_blank" rel="noreferrer">
                    <Icon as={AiOutlineGithub} boxSize={9}/>
                </a>
                <a  alignSelf='center' href='https://www.linkedin.com/in/rwchen/' target="_blank" rel="noreferrer">
                    <Icon as={AiOutlineLinkedin} boxSize={10}/>
                </a>
                <a  alignSelf='center' href='mailto:rebeccawchen@gmail.com'>
                    <Icon as={AiOutlineMail} boxSize={10}/>
                </a>
             </footer>
        </Flex>
    )
}
