"use client";

import React, { useEffect } from 'react';
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export default function Donate() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const url = "upi://pay?pa=amongusindians@axl&pn=AmongUsIndians";

    const { toast } = useToast()
    const [text, setText] = useState(id || null);
    const [anonymous, setAnonymous] = useState(false);
    
    const [amount, setAmount] = useState("custom");
    
    const { data } = useSession();

    useEffect(() => {
        if (id) {
            setText(id);
            setAnonymous(false);
        } else if (data?.user?.name) {
            setText(data.user.name);
            setAnonymous(false);
        } else {
            setText(null);
            setAnonymous(true);
        }

    }, [id, data]);

    return (

        <>
            <div className='h-[calc(100vh-10rem)] flex flex-col items-center justify-center'>
                
                
                <ToggleGroup type="single" className='mb-4' value={amount} onValueChange={setAmount}>
                    <ToggleGroupItem value="100" aria-label="Toggle bold">
                        100
                    </ToggleGroupItem>
                    <ToggleGroupItem value="200" aria-label="Toggle italic">
                        200
                    </ToggleGroupItem>
                    <ToggleGroupItem value="500" aria-label="Toggle strikethrough">
                        500
                    </ToggleGroupItem>
                    <ToggleGroupItem value="custom" aria-label="Toggle strikethrough">
                        Custom
                    </ToggleGroupItem>
                </ToggleGroup>

                <QRCodeCanvas className='border p-2 bg-foreground rounded ' value={url + ((text && !anonymous) ? "&tn=" + text : "") + ((amount && amount !== "custom") ? "&am=" + amount : "")
                } size={200} level='Q'
                    imageSettings={{
                        src: '/aui.png',
                        height: 50,
                        width: 50,
                        excavate: true,
                    }}
                />
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm mt-4">
                    UPI : amongusindians@axl
                </div>

            </div>
            <div className='flex flex-row space-x-2 mt-4 absolute bottom-4 right-4' >
                {/* <Checkbox id="ann" checked={anonymous} disabled={text ? false : true} */}
                <Checkbox id="ann" checked={anonymous}
                    onClick={() => {
                        if (!text) {
                            toast({
                                title: "Opps!",
                                description: "Login will help us to know your name",
                                duration: 5000,
                                variant: "destructive"
                            });
                        } else {
                            setAnonymous(!anonymous);
                        }
                    }
                    }>
                </Checkbox>
                <label
                    htmlFor="ann"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Anonymous
                </label>

            </div>
        </>
    );
};