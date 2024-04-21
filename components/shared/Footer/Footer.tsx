import React,{Suspense} from 'react'
import Logo from '../Logo/logo'
const Footer = () => {
  return (
<footer className="bg-white  shadow dark:bg-gray-900 ">
    <div className="w-full max-w-screen-xl mx-auto p-2 md:p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-2 sm:mb-0 space-x-2 md:space-x-3 rtl:space-x-reverse">
            <Suspense fallback={<p>...</p>}><Logo /></Suspense>
            <span className="self-center text-base md:text-2xl font-semibold whitespace-nowrap dark:text-white">Karyana Store</span>
            </a>
            <ul className="flex flex-wrap items-center mb-4 text-xs md:text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 max-w-xs md:max-w-none">
                <li>
                    <a href="#" className="hover:underline me-2 md:me-4">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-2 md:me-4">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-2 md:me-4">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
        <span className="block text-xs md:text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>
  )
}

export default Footer
