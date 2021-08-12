
import { useDispatch } from 'react-redux';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
         Icon, Button, IconButton } from '@chakra-ui/react';
import { TiTrash } from 'react-icons/ti';
import { deleteSessions } from '../../store/dashboard-sessions';
import styles from '../../css.modules/Dashboard.module.css';

export default function DeleteSession({session, openDelete, setOpenDelete}) {
    // Hooks
    const dispatch = useDispatch();
    // State

    const closeDelete = () => setOpenDelete(false); // close popover

    const handleDelete = () => {
        dispatch(deleteSessions(session.id))
    }
    return (
        <Popover 
        placement='right'
        isOpen={openDelete}
        onClose={closeDelete}
        >
            <PopoverTrigger>
                <IconButton icon={<TiTrash/>} boxSize={6} m={1} className={styles.sessionIcons}
                onClick={() => setOpenDelete(true)}
                ></IconButton>
            </PopoverTrigger>
            <PopoverContent w={150}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation</PopoverHeader>
                <PopoverBody>Delete this session?</PopoverBody>
                <PopoverFooter>
                    <Button color="white" bg='#e53e3e' _hover={{bg:"#c53030"}}onClick={handleDelete}>Yes</Button>
                </PopoverFooter>
            </PopoverContent>
            </Popover>
    )
}
