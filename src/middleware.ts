
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export { default } from 'next-auth/middleware'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })  // Get the token from the request

    const path = request.nextUrl.pathname  // Get the current path of the request

    // If the user has a token (logged in)
    if (token) {
        // Allow access to any page except /sign-up, /sign-in, /verify
        if (path.startsWith('/sign-up') || path.startsWith('/sign-in') || path.startsWith('/verify')) {
            return NextResponse.redirect(new URL('/dashboard', request.url))  // Redirect to dashboard or another protected page
        }
    } else {
        // If the user doesn't have a token (not logged in)
        // Allow access to home, about, sign-in, sign-up, and verify pages
        if (path === '/' || path === '/about' || path.startsWith('/sign-in') || path.startsWith('/sign-up') || path.startsWith('/verify')) {
            return NextResponse.next()  // Allow access to these pages
        } else {
            // Redirect any other pages to /sign-in
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }
    }

    return NextResponse.next()
}

// Updated config with correct matcher pattern
export const config = {
    matcher: [
        '/',
        '/about',  // Allow access to the about page
        '/sign-in',
        '/sign-up',
        '/verify/:path*',
        '/dashboard/:path*',
        '/blog/:path*',
    ],
}
