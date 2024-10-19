import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './utils/session'
 
// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
    //check if route is protected
    const protectedRoutes=['/links','/profile']
    const currentPath=req.nextUrl.pathname
    const isProtectedRoute=protectedRoutes.includes(currentPath)
    //check for valid session
    if(isProtectedRoute){
        const cookie=cookies().get('session')?.value
        const session=await decrypt(cookie)
        if(!session?.userId){
            return NextResponse.redirect(new URL('/signin',req.nextUrl))
        }
        return NextResponse.next()
    }
    //redirect unauthorised users
    
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/links','/profile'],
}