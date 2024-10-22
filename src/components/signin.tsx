"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Signin() {

  const user = useSession();

  return (
    <div>
      <Button
        variant="outline"
        className="w-full sm:w-1/2 font-medium"
        onClick={() => {
          signIn("credentials", { phone: "123456789", code: "1234" });
        }}
      >
        Sign in
      </Button>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
