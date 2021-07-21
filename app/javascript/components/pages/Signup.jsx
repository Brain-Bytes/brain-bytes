import React, { useState } from 'react';
import * as HttpClient from '../services/HttpClient';
import { Link, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../navigation/Navbar';

const Login = () => {
  let history =  useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e) => {
    setErrorMessage('');
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) return setErrorMessage('Please fill in email and password.');
    if (e.target.password.value !== e.target.repeat_password.value) return setErrorMessage('Your passwords are not the same.')
    if (e.target.password.value.length < 6) return setErrorMessage('Your password must be at least 6 characters long.')

    setIsLoading(true);
    HttpClient.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
      user: {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.headers.authorization);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userId', response.data.userId);
        setIsLoading(false);
        history.push('/');
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(`Oh no! ${error.response.data.message}`);
      });
    };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-full pt-8 bg-grey-background">
        <Form className="w-10/12 p-4 mx-auto rounded md:w-6/12 bg-grey-dark shadow-light" onSubmit={handleSignUp}>
          <Form.Group controlId="email" className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="john@wick.com" />
          </Form.Group>

          <Form.Group controlId="username" className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" name="username" placeholder="john wick" />
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="repeat_password" className="mb-4">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" name="repeat_password" placeholder="Repeat Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            <div className="flex align-items-center">
              <span>Sign up</span>
              {/* {isLoading && <Spinner className={classes.root} />} */}
            </div>
          </Button>

          <Link to="/login">
            <span className="p-2 ml-4 text-white no-underline border rounded cursor-pointer">Login</span>
          </Link>

          {errorMessage && <div className="mt-4 text-danger">{errorMessage}</div>}
        </Form>
      </div>
    </div>
  );
}

export default Login;
