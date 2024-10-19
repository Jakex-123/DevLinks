// @ts-nocheck
"use client";
import { signupUser } from '@/actions/User.action';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';

const SignUp = () => {
  const [state, action, pending] = useFormState(signupUser, null);


  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className='font-bold p-2 text-accent text-center text-xl'>Create a new account</h1>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {state?.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="text" 
          name="email" 
          id="email" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password" // Use type="password" for better security
          name="password" 
          id="password" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {state?.errors?.password && <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>}
      </div>

      <div>
        <button disabled={pending}
          type="submit" 
          className="w-full px-4 py-2 outline outline-1 text-accent font-medium rounded-md hover:bg-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"        >
          {pending ? 'Submitting...' : 'Sign Up'}
        </button>
        <p className='mt-2 text-blue-700 text-center' ><Link href={'/signin'}>Already have an account?</Link></p>
      </div>
    </form>
  );
};

export default SignUp;
