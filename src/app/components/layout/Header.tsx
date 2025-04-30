'use client'
import { logoutUser } from '@/actions/auth'
import { User } from '@/generated/prisma'
import { log } from 'console'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AnnouncementBar = ()=> {
    return(
        <div className='w-full bg-black py-2'>
            <div className='container mx-auto flex items-center justify-center px-8'>
                <span className='text-center text-sm font-medium tracking-wide text-white'>
                        FREE SHIPPING ON ORDERS $15.00 • FREE RETURNS
                </span>
            </div>
        </div>
    )
}
type HeaderProps = {
    user: Omit<User,"passwordHash"> | null;
}
const Header = ({user}: HeaderProps) => {
     const [isOpen, setIsOpen] = useState<boolean>(true);
     const [prevScrollY, setPrevScrollY] = useState<number>(0);
     const router = useRouter()

     useEffect(()=> {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrolledUp = currentScrollY < prevScrollY;
            
            if(scrolledUp){
             setIsOpen(true)   
            }else if (currentScrollY > 100) {
                setIsOpen(false)
            }
                setPrevScrollY(window.scrollY)
        }
        setPrevScrollY(window.scrollY)
        window.addEventListener('scroll',handleScroll)
        return ()=> {
            window.removeEventListener('scroll',handleScroll)
        }
     }, [prevScrollY])
  return (
    <header className='w-full sticky top-0 z-50'>
        <div className={`w-full transform transition-transform duration-300 ease-in-out ${isOpen? 'translate-y-0': '-translate-y-full'}`}>
            <AnnouncementBar/>
            <div className='w-full flex justify-between py-3 items-center bg-white/80 shadow-sm border-gray backdrop-blur-sm'>
                <div className='flex justify-between items-center container mx-auto px-8'>
                    <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'> 
                        <button className='text-gray-700 hover:text-gray-900 md:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 sm:h-6 sm:w-6' viewBox="0 0 50 50">
                        <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                        </svg>
                        </button>

                        <nav className='md:hidden flex gap-4 lg:gap-6 text-sm font-medium'>
                            <Link href='#' >Shop</Link>
                            <Link href='#' >New Arrivals</Link>
                            <Link href='#' >Sale</Link>
                        
                        </nav>
                        
                    </div>
                    <Link href='#' className='absolute left-1/2 -translate-x-1/2'>
                    <span className='text-xl sm:text-2xl font-bold tracking-tight'>
                    DEAL   
                    </span>                    
                    </Link>
                    
                    <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
                    <button className='text-gray-700 hover:text-gray-900 md:hidden block'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 sm:h-6 sm:w-6' viewBox="0 0 50 50">
                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                    
                    </button>

                    {user? (
                        <div className='flex items-center gap-2 sm:gap-4'>
                            <span className='text-sm sm:text-sm text-gray-700 md:hidden block'>
                                {user.email}
                            </span>
                            <Link href='#' 
                            className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                            onClick={async(e)=> {
                                e.preventDefault()
                                await logoutUser()
                                router.refresh();
                            }}
                            >
                                Sign out
                            </Link>
                        </div>
                    )
                    :
                    (<>
                     <Link href='/auth/sign-in'>Sign In </Link>
                     <Link href='/auth/sign-up'>Sign Up</Link>
                    </>)}
                   

                    <button className='text-gray-700 hover:text-gray-900 relative'> 
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                    </svg>
                    <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w4 sm:h-4 rounde-full flex items-center justify-center'>
                     0
                    </span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header