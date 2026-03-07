"use client";
import Image from "next/image";
export default function TrustedBrandsMarquee() {
  const logos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <section className="trusted-brands py-16 relative bg-black">
      <h3 className="text-lg font-medium text-white text-600 text-center ">
        Trusted by 100K+ Active Members from India
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-16 w-max mx-auto">
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-t-0 border-l-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-t-0 border-x-0 md:border-r"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden md:flex md:border-t-0 md:border-x-0 lg:border-r"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden lg:block lg:border-x-0 lg:border-t-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden xl:block xl:border-t-0 xl:border-r-0"></div>
    <div className="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-y-0 border-x-0 border-r md:hidden lg:flex lg:border-b">
         <Image
                src="/discordlogo.png"
                alt="Discord"
                width={100}
                height={32}
                className="object-contain"
            />
    </div>
    <div className="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-y-0 border-x-0 md:border-r md:border-b">
        <Image
                src="/AmongUs.png"
                alt="Amongus"
                width={100}
                height={32}
                className="object-contain"
            />
    </div>
    <div className="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 border-r md:border-t-0">
        <Image
                src="/Brawlhalla.png"
                alt="Brawlhalla"
                width={100}
                height={32}
                className="object-contain"
            />
    </div>
    <div className="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 md:border-t-0">
        <Image
                src="/Minecraft.png"
                alt="Minecratf"
                width={100}
                height={32}
                className="object-contain"
            />
    </div>
    <div className="hover:bg-slate-50 items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden xl:flex xl:border-t-0 xl:border-r-0">
        <Image
                src="/RiotGames.png"
                alt="Riot"
                width={100}
                height={32}
                className="object-contain"
            />
    </div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden xl:block xl:border-y-0 xl:border-l-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden lg:block lg:border-y-0 lg:border-l-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden md:block md:border-l-0 md:border-y-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 border-y-0 border-r xl:border-r-0"></div>
    <div className="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 border-y-0 xl:border-l"></div>
</div>
      
    </section>
  );
}
