//@ts-nocheck

"use server"
import { User } from "@/database/user.model";
import { connectDB } from "@/mongoose";
import {UserProps } from "@/types/types";
import { createSession, decrypt } from "@/utils/session";
import { loginSchema, signupSchema } from "@/utils/validation";
import bcrypt, { compare } from 'bcryptjs';
import { get } from "http";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const signupUser = async (state,signupData:FormData) => {
    // Connect to the database
    const validationResult=signupSchema.safeParse({
      name:signupData.get('name'),
      email:signupData.get('email'),
      password:signupData.get('password')
    })
    if(!validationResult.success){
      return {
        errors:validationResult.error.flatten().fieldErrors
      }
    }
    await connectDB();
    const { name, email, password } = validationResult.data;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        errors: { email: ['User with this email already exists'] },
        success: false
      };
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user with the hashed password
    const user=await User.create({ name, email, password: hashedPassword });  
    await createSession(user._id)
    if(user) return {success:true}
};



export const loginUser = async (state, loginData: FormData) => {
  // Connect to the database
  await connectDB();
  
  const email = loginData.get('email');
  const password = loginData.get('password');

  // Validate input using Zod
  const validationResult = loginSchema.safeParse({ email, password });
  
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Extract validated data
  const { email: validEmail, password: validPassword } = validationResult.data;

  // Check if the user exists
  const user = await User.findOne({ email: validEmail });
  if (!user) {
    return {
      errors: { email: ['User not found'] },
      success: false,
    };
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(validPassword, user.password);
  if (!isPasswordValid) {
    return {
      errors: { password: ['Invalid password'] },
      success: false,
    };
  }

  // Create a session for the user
  await createSession(user._id);

  // Return success if login is successful
  return {
    success: true,
  };
}

export async function getUser(){
  try{
    connectDB()
    const userId=await decrypt(cookies().get('session')?.value)
    const user=await User.findById(userId?.userId).select(['-password','-_id'])
    return JSON.stringify(user)
  }
  catch(error){
    console.log(error)
  }
}