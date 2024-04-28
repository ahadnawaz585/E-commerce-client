"use client"
import Logo from "@/components/shared/Logo/logo";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import AuthService from "@/authentication/auth.service";

export default function Home() {
  const authService: AuthService = new AuthService();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <main className="bg-white">
      <div className="px-4 pt-1 lg:px-5"> {/* Reduced top padding */}
        <div className="mx-auto max-w-2xl py-10 sm:py-20 lg:py-36">
          <Suspense fallback={<p>...</p>}><Logo /></Suspense>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next discount offers soon.{' '}
              <Link href={authenticated ? "/dashboard" : "/login"} className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to Karyana Store - Your Ultimate Destination for Quality Groceries!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Karyana Store, we believe in providing you with the finest selection of groceries, that cater to your every need. From fresh produce to pantry essentials, we've got you covered. Whether you're a seasoned chef looking for premium ingredients or a busy parent seeking convenience,clothing stuff or our diverse range of products ensures that there's something for everyone.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={authenticated ? "/dashboard" : "/login"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
