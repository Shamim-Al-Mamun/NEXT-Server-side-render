import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';
import style from '../../components/css/style.module.css';

const Note = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(isDeleting){
            deleteNote();
        }
    },[isDeleting])

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {   
            const deleted = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
            });
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }
    const open = () => {
        setConfirm(true);
    }

    const close = () => {
        setConfirm(false);
    }

    const handleConfirm = async () => {
        setIsDeleting(true);
        close(); 
    }
    return (
        <div className={style.notecontainer}>
            {
                isDeleting ? <Loader active />
                    :
                    <>
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                        <Button color='red' onClick={open}>Delete</Button>
                    </>
            }

            <Confirm 
                open={confirm}
                onCancel={close}
                onConfirm={handleConfirm}

            />
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);

    const { data } = await res.json();

    return {
        note: data
    }
}

export default Note;