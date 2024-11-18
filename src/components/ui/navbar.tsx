"use client"
import Link from "next/link"
import { useSession, signOut,  } from 'next-auth/react';
import {User} from 'next-auth'
import { Button } from "./button";
const Navbar = () => {
    const { data: session } = useSession();
    const user : User = session?.user as User;
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white h-10vh">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className=" text-2xl font-bold mb-4 md:mb-0">
        Anonymous
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black text-xl font-semibold hover:bg-slate-300" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
