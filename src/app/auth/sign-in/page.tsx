import { getCurrentSession, loginUser, registerUser } from '@/actions/auth'
import SignIn from '@/app/components/auth/SignIn';
import SignUp from '@/app/components/auth/SignUp';
import { redirect } from 'next/navigation';
import React from 'react'
import { z } from 'zod';

const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

async function SigninPage() {
 
const {user} =await getCurrentSession();
if(user){
    return redirect('/')
}
const action = async (prevState: any, formData: FormData) => {
    'use server'
    const parsedData = SignInSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            message : 'Invalid data',
        }
    }
    const {email, password} = parsedData.data;
    const {user, error} = await loginUser(email, password);
    if (error){
        return {
            message: error,
        }
    }else if (user){
        return redirect('/')
    }
}
  return (
    <SignIn action = {action} />
  )
}

export default SigninPage