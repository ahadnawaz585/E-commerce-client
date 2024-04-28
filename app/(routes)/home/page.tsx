import React,{Suspense} from 'react'
const HomePage = React.lazy(()=>import('@/components/pages/Home/home'))
const page = () => {
  return (
  <Suspense>
    <HomePage />
  </Suspense>
  )
}

export default page
