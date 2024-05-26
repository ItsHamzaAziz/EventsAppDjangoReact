import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import api from '../api'

const NavButtons = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const handleOpenRegister = () => {
        setOpenRegister((cur) => !cur)
        setUsernameRegister("")
        setEmailRegister("")
        setPasswordRegister("")
        setPasswordRegister2("")
        setErrorRegister("")
        setSuccessRegister("")
    };

    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => {
        setOpenLogin((cur) => !cur)
    };

    const [usernameRegister, setUsernameRegister] = useState("")
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [passwordRegister2, setPasswordRegister2] = useState("")

    const [successRegister, setSuccessRegister] = useState("")
    const [errorRegister, setErrorRegister] = useState("")

    const [successLogin, setSuccessLogin] = useState("")
    const [errorLogin, setErrorLogin] = useState("")


    async function registerUser() {
        if (!usernameRegister || !passwordRegister || !emailRegister || !passwordRegister2) {
            setErrorRegister("All fields are required")
            return
        }

        if (passwordRegister!== passwordRegister2) {
            setErrorRegister("Passwords do not match")
            return
        }

        if (!emailRegister.includes('@') || !emailRegister.includes('.')) {
            setErrorRegister("Enter a valid email address")
            return
        }

        try {
            const res = await api.post('account/register/', { usernameRegister, emailRegister, passwordRegister })

            if (res.status === 200) {
                if (res.data.message === "Username already exists") {
                    setErrorRegister("Username already exists")
                    return
                }
                else if (res.data.message === "Email already exists") {
                    setErrorRegister("Email already exists")
                    return
                }

                setErrorRegister("")
                setSuccessRegister(res.data.message)
                setUsernameRegister("")
                setEmailRegister("")
                setPasswordRegister("")
                setPasswordRegister2("")
                return
            } else {
                setErrorRegister("An error has occurred")
                return
            }
        } catch (error) {
            setErrorRegister("An error has occurred")
            console.error(error)
            return
        }
    }



    return (
        <div className='md:space-x-2 text-white flex flex-col md:block space-x-0 mt-2 space-y-2 md:m-0 md:space-y-0'>
            <span>
                <button onClick={handleOpenLogin} className='bg-green py-1 px-4 rounded'>Login</button>
                <Dialog
                    size="xs"
                    open={openLogin}
                    handler={handleOpenLogin}
                    className="bg-transparent shadow-none"
                >
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Login
                            </Typography>

                            {
                                successLogin && (
                                    <div className='bg-green text-white text-center p-1 rounded-md'>{ successLogin }</div>
                                )
                            }

                            {
                                errorLogin && (
                                    <div className='bg-red text-white text-center p-1 rounded-md'>{ errorLogin }</div>
                                )
                            }

                            <Input label="Email or Username" type='text' size="lg" />
                            <Input label="Password" size="lg" type='password' />
                        </CardBody>
                        <CardFooter className="pt-0 space-y-2">
                            <button className='bg-green py-1 px-4 rounded w-full text-white'>
                                Login
                            </button>
                            <button className='bg-red text-white py-1 px-4 rounded w-full' onClick={handleOpenLogin}>
                                Close
                            </button>
                        </CardFooter>
                    </Card>
                </Dialog>
            </span>

            <span>
            <button onClick={handleOpenRegister} className='bg-blue py-1 px-4 rounded'>Register</button>
                <Dialog
                    size="xs"
                    open={openRegister}
                    handler={handleOpenRegister}
                    className="bg-transparent shadow-none"
                >
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Register
                            </Typography>

                            {
                                successRegister && (
                                    <div className='bg-green text-white text-center p-1 rounded-md'>{ successRegister }</div>
                                )
                            }

                            {
                                errorRegister && (
                                    <div className='bg-red text-white text-center p-1 rounded-md'>{ errorRegister }</div>
                                )
                            }

                            <Input label="Email" 
                                type='email' 
                                size="lg" 
                                value={ emailRegister } 
                                onChange={
                                    e => setEmailRegister(e.target.value)
                                }
                                required />
                            <Input label="Username" 
                                type='text' 
                                size="lg" 
                                value={ usernameRegister } 
                                onChange={
                                    e => setUsernameRegister(e.target.value)
                                }
                                required />
                            <Input label="Password" 
                                type='password' 
                                size="lg" 
                                value={ passwordRegister } 
                                onChange={
                                    e => setPasswordRegister(e.target.value)
                                }
                                required />
                            <Input label="Re Enter Password" 
                                type='password' 
                                size="lg" 
                                value={ passwordRegister2 } 
                                onChange={
                                    e => setPasswordRegister2(e.target.value)
                                }
                                required />
                        </CardBody>
                        <CardFooter className="pt-0 space-y-2">
                            <button className='bg-blue text-white py-1 px-4 rounded w-full' onClick={ registerUser }>
                                Register
                            </button>
                            <button className='bg-red text-white py-1 px-4 rounded w-full' onClick={handleOpenRegister}>
                                Close
                            </button>
                        </CardFooter>
                    </Card>
                </Dialog>
            </span>
        </div>
    )
}

export default NavButtons