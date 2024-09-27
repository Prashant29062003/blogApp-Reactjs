import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from '.index'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const [registe, handleSubmit] = useForm()

    const create = async (data) => {
        setError("")
        try {
            const newUserData = await authService.createAccount(data)
            if (newUserData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create your account</h2>
                <p>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-xl trasnition-all duration-200 hover:underline'
                    >
                        Sign In</Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                {/* Form creation */}
                <form action="" onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Name:"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter yor email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                        label = "Password"
                        type = "password"
                        placeholder = "Password"
                        {...register("password" {
                            required: true,
                        })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup