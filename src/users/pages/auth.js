import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FromElements/Button';
import Input from '../../shared/components/FromElements/Input';
import ImageUpload from '../../shared/components/FromElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './auth.css';

const Auth = () => {

    const auth = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email:{
            value : '',
            isValid: false
        },
        password:{
            value:'',
            isValid: false
        }
    }, false);

    const authSubmitHandler = async event => {
        event.preventDefault();
        //console.log(formState.inputs);
        if(isLogin){
            
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/login', 
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value 
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );

                auth.LogIn(responseData.userId, responseData.token);
            }catch(err){

            }

        }else{
            try{
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/signup', 
                    'POST',
                    formData
                );

                auth.LogIn(responseData.userId, responseData.token);
            }catch(err){

            }
        }
    };

    const switchModalHandler = () => {
        if(!isLogin){
            setFormData(
            {
                ...formState.inputs,
                name : undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            })
        }

        setIsLogin(prevMode => !prevMode);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLogin && <Input element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name."
                        onInput={inputHandler}
                    />}
                    {!isLogin && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image." />}
                    <Input element="input"
                    id="email"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter the valid email"
                    onInput={inputHandler}
                    />
                    <Input element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter the password of more than length 5."
                    onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>

                <Button inverse onClick={switchModalHandler}>SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
            </Card>
        </React.Fragment>
    );
};

export default Auth;