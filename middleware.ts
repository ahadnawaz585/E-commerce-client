import { NextResponse, NextRequest } from "next/server";
import ROUTES from "@/core/lib/routes"

let cookieKey: string = "auth_token";
let redirectTo: string | null = null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const getToken = () => {
    const token = request.cookies.get(cookieKey);
    return token;
  };

  if (pathname === "" ||pathname ==="/") {
    const analyticsUrl = `${request.nextUrl.origin}/analytics`;
    return NextResponse.redirect(analyticsUrl);
  }

  const isAuthenticated = (): boolean => {
    const token = getToken();
    return token !== null && token !== undefined;
  };

  const requiresAuth = (path: string): boolean => {
    return !ROUTES.public.includes(path);
  };

  const redirectToLogin = (redirectPath: string) => {
    const loginUrl = `${request.nextUrl.origin}${
      ROUTES.login
    }?redirect=${encodeURIComponent(redirectPath)}`;
    return NextResponse.redirect(loginUrl);
  };

  const redirectToHome = () => {
    const homeUrl = `${request.nextUrl.origin}${ROUTES.home}`;
    return NextResponse.redirect(homeUrl);
  };

  if (requiresAuth(pathname)) {
    if (!isAuthenticated()) {
      redirectTo = pathname;
      return redirectToLogin(redirectTo);
    }
  }

  if (isAuthenticated()) {
    if (pathname === "/login") {
      return redirectToHome();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)'],
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
// }

export const getRedirectPath = () => {
  return redirectTo;
};
