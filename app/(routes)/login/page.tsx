import React, { Suspense } from 'react'
import Loader from '@/components/shared/loader/loader'
const Login = React.lazy(() => import('@/components/pages/login/login'));


const page = () => {
  return (
    <Suspense fallback={<Loader />}><Login /></Suspense>
  )
}

export default page
