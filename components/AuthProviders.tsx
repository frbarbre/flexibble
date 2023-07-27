"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { nanoid } from "nanoid";
import Button from "./Button";
import { motion as m } from "framer-motion";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();

      console.log(res);

      setProviders(res);
    }

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        {Object.values(providers).map((provider: Provider) => (
          <Button
            handleClick={() => signIn(provider?.id)}
            title="Sign In"
            key={nanoid()}
          />
        ))}
      </m.div>
    );
  }
}
