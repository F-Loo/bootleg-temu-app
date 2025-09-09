import { getAllCategories } from '@/sanity/lib/client';
import React from 'react'

const HeaderCategorySelector = async() => {

      const categories = await getAllCategories();

  return (
    <div className='relative inline-block'>
        <button className='peer text-gray-700 hover:text-gray-900 text-sm flex items-center gap-1'>
        Categories
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className='h-4 w-4 transition-transform duration-200 group-hover:rotate-100' 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor">
        <path strokeLinecap="round" 
        strokeLinejoin="round" strokeWidth={2}
         d="M19 9l-7 7-7-7" 
         />
         <path d="m6 9 6 6 6-6" />'
        </svg>
        </button>
        <div>

        </div>

    </div>
  )
}

export default HeaderCategorySelector