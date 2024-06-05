import React, { useState, useEffect } from 'react'
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

const NavButtons = () => {
    const navigate = useNavigate()
    const location = useLocation()

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

    const [username, setusername] = useState("")
    const [password, setPasswordLogin] = useState("")

    const [successRegister, setSuccessRegister] = useState("")
    const [errorRegister, setErrorRegister] = useState("")


    const [errorLogin, setErrorLogin] = useState("")
    
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const [loadingLogin, setLoadingLogin] = useState(false) 
    const [loadingRegister, setLoadingRegister] = useState(false) 
    

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN)
            setIsAuthenticated(!!accessToken)
        } catch (error) {
            console.error(error)
        }
    }, [])


    async function loginUser() {
        setLoadingLogin(true)
        setErrorLogin("")

        if (!username || !password) {
            setErrorLogin("All fields are required")
            setLoadingLogin(false)
            return
        }

        try {
            const res = await api.post('api/token/', { username, password })

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                setLoadingLogin(false)

                handleOpenLogin()

                if (location.pathname === '/'){
                    navigate('/my-events')
                } else {
                    navigate('/')
                }
            } else {
                setErrorLogin("Invalid Credentials")
                setLoadingLogin(false)
                return
            }
        } catch (err) {
            setErrorLogin("Error Occured")
            setLoadingLogin(false)
            return
        }
    }


    async function registerUser() {
        setLoadingRegister(true)
        setSuccessRegister("")
        setErrorRegister("")

        if (!usernameRegister || !passwordRegister || !emailRegister || !passwordRegister2) {
            setErrorRegister("All fields are required")
            setLoadingRegister(false)
            return
        }

        if (passwordRegister !== passwordRegister2) {
            setErrorRegister("Passwords do not match")
            setLoadingRegister(false)
            return
        }

        if (!emailRegister.includes('@') || !emailRegister.includes('.')) {
            setErrorRegister("Enter a valid email address")
            setLoadingRegister(false)
            return
        }

        try {
            const res = await api.post('account/register/', { usernameRegister, emailRegister, passwordRegister })

            if (res.status === 200) {
                if (res.data.message === "Username already exists") {
                    setErrorRegister(res.data.message)
                    setLoadingRegister(false)
                    return
                }
                else if (res.data.message === "Email already exists") {
                    setErrorRegister("Email already exists")
                    setLoadingRegister(false)
                    return
                }

                setLoadingRegister(false)
                setErrorRegister("")
                setSuccessRegister(res.data.message)
                setUsernameRegister("")
                setEmailRegister("")
                setPasswordRegister("")
                setPasswordRegister2("")
                return
            } else {
                setErrorRegister("An error has occurred")
                setLoadingRegister(false)
                return
            }
        } catch (error) {
            setErrorRegister("An error has occurred")
            setLoadingRegister(false)
            console.error(error)
            return
        }
    }



    return (
        <div className='md:space-x-2 text-white flex flex-col md:block space-x-0 mt-2 space-y-2 md:m-0 md:space-y-0'>
            {
                !isAuthenticated ? (
                    <>
                        <span>
                            <button onClick={ handleOpenLogin } className='bg-green py-1 px-4 rounded'>Login</button>
                            <Dialog
                                size="xs"
                                open={ openLogin }
                                handler={ handleOpenLogin }
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <Typography variant="h4" color="blue-gray">
                                            Login
                                        </Typography>

                                        {
                                            errorLogin && (
                                                <div className='bg-red text-white text-center p-1 rounded-md'>{ errorLogin }</div>
                                            )
                                        }

                                        <Input label="Username"
                                            type='text'
                                            size="lg"
                                            value={ username }
                                            onChange={ e => setusername(e.target.value) } />
                                        <Input label="Password"
                                            size="lg"
                                            type='password'
                                            value={ password }
                                            onChange={ e => setPasswordLogin(e.target.value) } />
                                    </CardBody>
                                    <CardFooter className="pt-0 space-y-2">
                                        <button className='bg-green py-2 px-4 h-8 flex items-center justify-center rounded w-full text-white' onClick={ loginUser }>
                                            {
                                                loadingLogin ? (
                                                    <ThreeCircles
                                                        color="white"
                                                        height={15}
                                                        width={15}
                                                    />
                                                ) : (
                                                    'Login'
                                                )
                                            }
                                        </button>
                                        <button className='bg-red text-white py-1 px-4 h-8 rounded w-full' onClick={ handleOpenLogin }>
                                            Close
                                        </button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        </span>

                        <span>
                            <button onClick={ handleOpenRegister } className='bg-blue py-1 px-4 rounded'>Register</button>
                            <Dialog
                                size="xs"
                                open={ openRegister }
                                handler={ handleOpenRegister }
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
                                        <button className='bg-blue text-white flex items-center justify-center py-1 px-4 h-8 rounded w-full' onClick={ registerUser }>
                                            {
                                                loadingRegister ? (
                                                    <ThreeCircles
                                                        color="white"
                                                        height={15}
                                                        width={15}
                                                    />
                                                ) : (
                                                    'Register'
                                                )
                                            }
                                        </button>
                                        <button className='bg-red text-white py-1 px-4 h-8 rounded w-full' onClick={ handleOpenRegister }>
                                            Close
                                        </button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        </span>
                    </>
                ) : (
                    <span>
                        <Link to={'/logout'}>
                            <button className='bg-red py-1 px-4 rounded'>Logout</button>
                        </Link>
                    </span>
                )
            }



        </div>
    )
}

export default NavButtons