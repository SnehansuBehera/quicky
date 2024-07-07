'use client'

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<variant>('LOGIN');
    const [loading, setLoading] = useState(false);

    const toggleSubmit = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN');
        }
    }, [variant])

    useEffect(() => {
        if (session?.status === 'authenticated') {
            console.log('Authenticated');
            router.push('/users')
        }
    }, [session?.status, router])

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',

        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        if (variant === 'LOGIN') {
            signIn('credentials', { ...data, redirect: false }).then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials');
                } else {
                    toast.success('Login successfull')
                }
            }).finally(() => setLoading(false))

        } else {
            axios.post('/api/register', data)
                .catch(() => toast.error("Something went wromg")).finally(() => setLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setLoading(true);

        signIn(action, { redirect: false }).then((callback) => {
            if (callback?.error) {
                toast.error('Invalid credentials');
            }
            if (callback?.ok && !callback?.error) {
                toast.success('Logged in!');
            }
        }).finally(() => setLoading(false))
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>


                <form onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && <Input id='name' type='name' register={register} label='Name' error={errors} />}
                    <Input id='email' type='email' register={register} label='Email' error={errors} disabled={loading} />
                    <Input id='password' type='password' register={register} label='Password' error={errors} disabled={loading} />
                    <div className='mt-2'>
                        <Button disabled={loading} type='submit' fullWidth>
                            {
                                variant === 'LOGIN' ? 'sign in' : 'Register'
                            }
                        </Button>
                    </div>

                </form>

                {/* -----Or continue with----- */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    {/* -----Or continue with----- */}

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>

                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'Dont have account?' : 'Already registered!'}
                    </div>
                    <div onClick={toggleSubmit}
                        className='cursor-pointer text-sky-500'>
                        {variant === 'REGISTER' ? 'Login' : 'Register'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
