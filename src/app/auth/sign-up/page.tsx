import { getCurrentSession, loginUser, registerUser } from '@/actions/auth'
import SignUp from '@/app/components/auth/SignUp';
import { redirect } from 'next/navigation';
import React from 'react'
import { z } from 'zod';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

async function SignupPage() {
 
const {user} =await getCurrentSession();
if(user){
    return redirect('/')
}
const action = async (prevState: any, formData: FormData) => {
    'use server'
    const parsedData = SignUpSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            message : 'Invalid data',
        }
    }
    const {email, password} = parsedData.data;
    const {user, error} = await registerUser(email, password);
    if (error){
        return {
            message: error,
        }
    }else if (user){
        await loginUser(email, password);
        return redirect('/')
    }
}
  return (
    <SignUp action = {action} />
  )
}

export default SignupPage