import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import Image from "next/image";

// 📦 Array of form objects
const forms = [
  {
    title: "Mod Application",
    description: "Fill this form to apply for a moderator position",
    href: "/forms/modApp",
    banner_url: "/staff_form_banner.png"
  },
  {
    title: "Unban Form",
    description: "Fill this form to request an unban from the server",
    href: "/forms/unban",
  },
];

export default function Forms() {
  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form, index) => (
          <Link href={form.href} key={index}>
            <Card>
                
                {/*  banner */}
                <div className="relative w-full h-32 rounded-t-lg overflow-hidden p-2">
                  <Image src={form.banner_url || "/forms_default_banner.png"} alt="Banner" layout="fill" objectFit="cover" className="rounded-t-lg" />
                </div>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
