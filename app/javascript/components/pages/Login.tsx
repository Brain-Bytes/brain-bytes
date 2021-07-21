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

  const handleLogin = (e: any) => {
    setErrorMessage('');
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) {
      return setErrorMessage('Please fill in email and password');
    }
    setIsLoading(true);
    HttpClient.post(`login`, {
      user: {
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
        setErrorMessage(`Oh no! ${error.response.data.error}`);
      });
    };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-full pt-8 bg-grey-background">
        <Form className="w-10/12 p-4 mx-auto rounded md:w-6/12 bg-grey-dark shadow-light" onSubmit={handleLogin}>
          <Form.Group controlId="email" className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="john@wick.com" />
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            <div className="flex align-items-center">
              <span>Log in</span>
              {/* {isLoading && <Spinner className={classes.root} />} */}
            </div>
          </Button>

          <Link to="/signup">
            <span className="p-2 ml-4 text-white no-underline border rounded cursor-pointer">Sign up</span>
          </Link>

          {errorMessage && <div className="mt-4 text-danger">{errorMessage}</div>}
        </Form>
      </div>
    </div>
  );
}

export default Login;
