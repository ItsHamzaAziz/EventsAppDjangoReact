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

const NavButtons = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const handleOpenRegister = () => setOpenRegister((cur) => !cur);

    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => setOpenLogin((cur) => !cur);


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
                            <Input label="Email" type='email' size="lg" required />
                            <Input label="Username" type='text' size="lg" required />
                            <Input label="Password" type='password' size="lg" required />
                            <Input label="Re Enter Password" type='password' size="lg" required />
                        </CardBody>
                        <CardFooter className="pt-0 space-y-2">
                            <button className='bg-blue text-white py-1 px-4 rounded w-full'>
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