'use client'
import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import {Select, SelectSection, SelectItem} from "@nextui-org/select"; 

import {Input, Button} from "@nextui-org/react";

export default function App() {
  const [userType, setUserType] = useState<string>('student');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  }


    function handleClick() {
        //get the values of the inputs
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const username = usernameInput ? usernameInput.value : '';
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const password = passwordInput ? passwordInput.value : '';
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const name = nameInput ? nameInput.value : '';

        console.log(name, username, password, userType);
        
        // get api token
        fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
                type: userType
            })
        })
        .then(response => response.json())

        .then(data => {
            if(data.status === 200) {
                alert(data.message)
                window.location.href = '/';
                return;
            }
            else {
              alert(data.message)
            }
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
        <Input type="text" id='name' label="name" placeholder="Enter your name" />
           <Input type="text" id='username' label="Username" placeholder="Enter your username" />
           <Input type="password" id="password"  label="Password" placeholder="Enter your password" />
      <Select 
        label="Select type of user"
        className="w-full" 
        id="userType"
        onChange={handleChange}
      >
        <SelectItem  key={'student'} value="student">student</SelectItem>
        <SelectItem  key={'moderator'} value="moderator">moderator</SelectItem>
      </Select>
        </form>
      </CardBody>
      <Divider/>
      <CardFooter className="flex flex-col gap-3">
      <Button color="primary" variant="shadow" className="w-full" onPress={handleClick}>
        Register
      </Button>  
      <Link href="/" className="text-center">
        Login
        </Link>
      </CardFooter>
    </Card>
  );
}
