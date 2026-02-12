"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function AuthPrompt({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void; }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentication required</DialogTitle>
          <DialogDescription>
            You need to sign in with Discord to submit this form. Click the button below to sign in.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => signIn('discord')}>Sign in with Discord</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
