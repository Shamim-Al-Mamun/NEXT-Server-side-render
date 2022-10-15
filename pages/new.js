import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import style from '../components/css/style.module.css';

const New = () => {
    const [formState, setformState] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote(); //post request
                // alert('Success');
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createNote = async () => {
        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true)
    };
    const handleChange = (e) => {
        setformState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};

        if (!formState.title) {
            err.title = 'Title is Required'
        }

        if (!formState.description) {
            err.description = 'Description is Required'
        }

        return err;
    };

    const datas = [
        {
            _id:1,
            pID: null,
            label: "A",
            id: 1
        },
        {
            _id:2,
            pID: null,
            label: "B",
            id: 2
        },
        {
            _id:3,
            pID: 1,
            label: "a",
            id: 3
        },
        {
            _id:4,
            pID: 2,
            label: "b",
            id: 4
        },
        {
            _id:5,
            pID: 3,
            label: "aa",
            id: 5
        },
        {
            _id:6,
            pID: 3,
            label: "aa",
            id: 6
        },
        {
            _id:7,
            pID: 6,
            label: "aaa",
            id: 7
        },
        {
            _id:8,
            pID: 7,
            label: "aaaa",
            id: 8
        }
    ]
    var options =[];
    useEffect(() =>{

        const controller = new AbortController()

        const Recursive = (data) => {
            datas.map((each) => {
                if (data.id === each.pID) {
                    console.log(each.label);
                    options.push({key: each._id, text: each.label, value: each.label})
                    Recursive(each)
                }
            })
        }
    
        datas.map((data) => {
            if (!data.pID) {
                console.log(data.label)
                options.push({key: data._id, text: data.label, value: data.label})
                Recursive(data);
            }
        })

        return () => controller.abort();
    },[])

    // var options = [
    //     { key: 'm', text: 'Male', value: 'male' },
    //     { key: 'f', text: 'Female', value: 'female' },
    //     { key: 'o', text: 'Other', value: 'other' },
    //   ]

    return (
        <div className={style.formcontainer}>
            <h1 style={{marginBottom:"50px"}}>Create Catagory</h1>
            <div>
                {
                    isSubmitting ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Catagory Name'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.Select
                                fluid
                                // error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Parent Catagory'
                                options={options}
                                placeholder='Description'
                                name='description'
                                // onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                onChange={handleChange}
                            />

                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>

    );
}


export default New;