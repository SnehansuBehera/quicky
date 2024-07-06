'use client'

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
type variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN');
    const [loading, setLoading] = useState(false);

    const toggleSubmit = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN');
        }
    }, [variant])

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

        } else {

        }
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>


                <form onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && <Input id='name' type='name' register={register} label='Name' error={errors} />}
                    <Input id='email' type='email' register={register} label='Email' error={errors} />
                    <Input id='password' type='password' register={register} label='Password' error={errors} />
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
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----Or continue with----- */}

            </div>
        </div>
    )
}

export default AuthForm
