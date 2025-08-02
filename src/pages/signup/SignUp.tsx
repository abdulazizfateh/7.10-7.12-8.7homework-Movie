import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FcGoogle } from "react-icons/fc";
import { GrPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/zustand/useStore';

const schema = yup
    .object({
        email: yup.string().email('Enter a valid email address').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    })
    .required()

interface IForm {
    email: string,
    password: string
}

const SignUp = () => {
    const { addAuth } = useStore();
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
    })

    // Google Login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            addAuth(tokenResponse.access_token);
            fetch("https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            )
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    localStorage.setItem("user_info", JSON.stringify(res));
                    nav("/");
                }).catch((e) => {
                    console.log(e);
                })
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    // Fake Login
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<boolean>(false);
    const onSubmit = (data: IForm) => {
        console.log(data)
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false);
            setMessage(true);
        }, 2000)
    }

    return (
        <section className='section_signin'>
            <div className="container">
                <div className="signin_wrapper w-full h-screen flex items-center justify-center relative">
                    <button onClick={(() => nav(-1))} className='absolute top-3 left-0 sm:top-4 md:top-5 lg:top-7 px-5 py-2 rounded-xl bg-bg-dark-800 light:bg-bg-light-700 cursor-pointer flex items-center justify-center'>
                        <GrPrevious className='text-primary text-lg md:text-xl lg:text-[22px]' />
                    </button>
                    <div className='w-[95%] min-[480px]:w-[380px] sm:pb-[50px]'>
                        <div className='mb-4 sm:mb-5 lg:mb-6 flex flex-col gap-2 lg:gap-3'>
                            <h1 className='text-2xl sm:text-3xl lg:text-[32px] text-text-dark-100 light:text-text-light-100 text-center tracking-wide'>Sign Up</h1>
                            <p className='sm:w-[300px] mx-auto text-sm sm:text-base text-text-dark-600 light:text-text-dark-500 text-center tracking-wide'>Enter your email address to sign up</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2 lg:gap-3'>
                            <div className='flex flex-col gap-.5'>
                                <input {...register("email")} className='w-full h-14 lg:h-[60px] rounded-xl px-4 bg-bg-dark-800 light:bg-bg-light-700 text-text-dark-100 light:text-text-light-100 text-base tracking-wide outline-none' type='text' placeholder='Email Address' autoComplete='off' />
                                <p className='text-sm text-primary'>{errors.email?.message}</p>
                            </div>
                            <div className='flex flex-col gap-.5 mt-.5'>
                                <input {...register("password")} className='w-full h-14 lg:h-[60px] rounded-xl px-4 bg-bg-dark-800 light:bg-bg-light-700 text-text-dark-100 light:text-text-light-100 text-base tracking-wide outline-none' type='password' placeholder='Password' autoComplete='off' />
                                <p className='text-sm text-primary'>{errors.password?.message}</p>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full select-none h-12 lg:h-[52px] rounded-xl mt-2 bg-primary text-text-dark-100 flex items-center justify-center gap-2 transition-opacity ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                                    }`}
                            >
                                {isLoading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                <span className="text-base text-text-dark-100">
                                    {isLoading ? "Signing Up..." : "Sign Up"}
                                </span>
                            </button>
                        </form>
                        <div className='my-3 h-[22px] lg:h-[30px] flex items-center'>
                            {
                                message &&
                                <p className='text-sm text-primary text-center'>Internal Error! If the issue persists, please try signing in using your google account</p>
                            }
                        </div>
                        <p className='text-base text-text-dark-600 light:text-text-dark-500 text-center tracking-wide mb-2 lg:mb-3'>or</p>
                        <div className='w-full'>
                            <button onClick={() => login()} className='w-full rounded-xl h-14 lg:h-[60px] bg-bg-dark-800 light:bg-bg-light-700 flex items-center justify-center gap-2'>
                                <FcGoogle className='text-xl lg:text-2xl' />
                                <span className='text-base text-text-dark-100 light:text-text-light-100 tracking-wide'>Sign up with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(SignUp);


