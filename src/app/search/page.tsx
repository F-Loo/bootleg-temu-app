import SalesCampaignBanner from '@/app/components/layout/SalesCampaignBanner'
import ProductGrid from '@/app/components/product/ProductGrid'
import { getCategoryBySlug, getProductsByCategorySlug,  searchProducts } from '@/sanity/lib/client'
import React from 'react'
import { getEnabledCategories } from 'trace_events'

type SearchPageProps = {
 searchParams: Promise<{ query: string }>
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = await searchParams
//   const [category, products] = await Promise.all([
//     // get category by slug
//     // get products by category slug
//     getCategoryBySlug(slug),
//     getProductsByCategorySlug(slug)
//   ])
const products = await searchProducts(query)
  return (
    <div>
        <SalesCampaignBanner/>
        <div className='bg-red-50 p-4'>
            <div className='container mx-auto'>
                <h1 className='text-2xl md:text-3xl font-bold text-center text-red-600 mb-2'>Search Results for "{query}"</h1>
               <p className='text-center text-red-500 text-sm md:text-base animate-pulse'>
                Flash sale Ending Soon! ⏰ Limited time only.
               </p>
               <p className='text-center text-gray-600 text-xs mt-2'>
                   Discover amazing deals across various categories. Happy shopping!
               </p>
            </div>
        </div>
        <div className='bg-yellow-50 py-3'>
            <div className='container mx-auto'>

                <div className='flex items-center justify-center gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                        <span className='text-yellow-600'>🚚</span>
                        <span>FREE SHIPPING</span>

                         <span className='text-yellow-600'>⭐</span>
                        <span>TOP RATED</span>

                         <span className='text-yellow-600'>💰</span>
                        <span>BEST PRICES</span>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <div className='container mx-auto'>
                <div className='text-center mb-8'>
                    <p className='text-sm text-gray-500'>
                        {products.length} Amazing Deals Available Now !
                    </p>
                </div>
                {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {products.map((product) => (
                        <div key={product._id} className='border rounded-lg p-2'>
                            <img src={product.image} alt={product.title} className='w-full h-40 object-cover rounded-lg' />
                            <h3 className='font-semibold text-sm mt-2'>{product.title}</h3>
                            <p className='text-red-600 font-bold'>${product.price}</p>
                        </div>
                    ))}
                </div> */}
                <ProductGrid products={products}/>
            </div>
        </section>
    </div>
  )
}

export default SearchPage