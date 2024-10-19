//@ts-nocheck
"use server"

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT,jwtVerify } from 'jose';


const secret=new TextEncoder().encode(process.env.JWT_SECRET)

const cookie={
    name:'session',
    options:{httpOnly:true,secure:true,sameSite:'lax',path:'/'},
    duration:24*60*60*1000
}

export async function encrypt(payload) {
  return new SignJWT(payload)
  .setProtectedHeader({alg:'HS256'})
  .setIssuedAt()
  .setExpirationTime('1day')
  .sign(secret)
    
}
export async function decrypt(session) {
  // Check if the token is provided
  
  try {
    // Verify the token using jwt.verify
    const {payload} = await jwtVerify(session, secret, { algorithms: ['HS256'] });
    return payload; // Return the payload if verification is successful
  } catch (error) {
    // Log specific errors
    console.log(error,'JWT Verification Failed')
    return null; // Return null if verification fails
  }
}

export async function createSession(userId){
    const expires = new Date(Date.now()+cookie.duration)
    const session=await encrypt({userId,expires})
    //@ts-expect-error ignore
    cookies().set(cookie.name,session,{...cookie.options,expires})
    redirect('/links')
}
export async function verifySession(){
    const Cookie=cookies().get(cookie.name)?.value
    const session=await decrypt(Cookie)
    if(!session?.userId){
        redirect('/signin')
    }
    return {userId:session.userId}
}
export async function deleteSession(){
    cookies().delete(cookie.name)
    redirect('/signin')
}