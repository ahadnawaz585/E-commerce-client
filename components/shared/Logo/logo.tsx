"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      height="50"
      width="110"
      priority 
      className="
        hidden
        md:block  
        cursor-pointer
      "
      src="/images/logo.png"
    />
  );
};

export default Logo;
