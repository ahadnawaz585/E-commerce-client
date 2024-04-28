import React, { Suspense } from 'react'
const ProductForm = React.lazy(() => import('@/components/pages/Product/add/addProduct'));
import Loader from '@/components/shared/loader/loader';
const page = () => {
  return (
    <Suspense fallback={<Loader />}><ProductForm /></Suspense>
  )
}

export default page
