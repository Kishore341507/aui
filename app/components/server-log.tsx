"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import Image from 'next/image'

export default function ServerLogo() {

    const {theme} = useTheme()

    return (
            <Image
              src={theme === "light" ? "/aui_light.svg" : "/aui_dark.svg"}
              width={30}
              height={30}
              alt="AUI : logo"
            />
    )
}
