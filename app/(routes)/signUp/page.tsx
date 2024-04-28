import React, { Suspense } from 'react'

const SignUp = React.lazy(() => import('@/components/pages/signUp/signUp'))
import Loader from '@/components/shared/loader/loader'
const page = () => {
    return (
        <Suspense fallback={<Loader />}><SignUp /></Suspense>
    )
}

export default page
