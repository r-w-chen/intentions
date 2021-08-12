import React from 'react'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import styles from '../../css.modules/SideNav.module.css';

export default function Footer() {
    return (
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
    )
}
