"use client";
import { useRouter } from "@/navigation";
import { Button, ButtonProps } from "../ui/button";

function BackButton(props: ButtonProps) {
  const router = useRouter();
  return <Button onClick={() => router.back()} {...props} />;
}

export default BackButton;
