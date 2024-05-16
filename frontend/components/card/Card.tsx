'use client'
import React, { useEffect } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Input, Button} from "@nextui-org/react";

export default function App() {
    function handleClick() {
        //get the values of the inputs
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const username = usernameInput ? usernameInput.value : '';
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const password = passwordInput ? passwordInput.value : '';

        // get api token
        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())

        .then(data => {
            //save the token in the local storage
            localStorage.setItem('token', data.token)
            //redirect to the dashboard
            window.location.href = '/dashboard'
        })

    }

    useEffect(() => {
        //check if the user is already logged in
        const token = localStorage.getItem('token');
        if(token) {
            window.location.href = '/dashboard'
        }
    }, [])

  return (
    <Card className="max-w-[900px] w-1/2 h-1/2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md text-center">Login</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <form className="flex flex-col gap-3">
           <Input type="text" id='username' label="Username" placeholder="Enter your username" />
           <Input type="password" id="password"  label="Password" placeholder="Enter your password" />
        </form>
      </CardBody>
      <Divider/>
      <CardFooter className="flex flex-col gap-3">
      <Button color="primary" variant="shadow" className="w-full" onPress={handleClick}>
        Ingresar
      </Button>  

      <Link href="/register" className="text-center">
        Register
        </Link>
      </CardFooter>
    </Card>
  );
}
