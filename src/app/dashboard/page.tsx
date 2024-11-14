
'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
function page() {

  const { data: session } = useSession()

    const user: User = session?.user as User

  return (
    <div>
      

      <button onClick={() => signOut()} className="text-white m-20 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                            Logout
                        </button>

    </div>
  )
}

export default page
