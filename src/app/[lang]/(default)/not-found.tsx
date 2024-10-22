"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";
import NotFoundComponent from "@/components/notFoundComponent";
import SITEROUTES from "@/constants/site_routes";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(SITEROUTES.home);
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return <NotFoundComponent />;
}
