import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <div className="relative mt-[28rem] md:mt-[35rem]">
     <Image
            src="/footertop.webp"
            alt="Footer top decoration"
            width={1000}
            height={600}
            unoptimized
            className="absolute -top-[12rem] md:-top-[27rem] left-1/2 -translate-x-1/2 w-full max-w-[32rem] md:max-w-[53rem] h-auto pointer-events-none"
        />

        <Image
            src="/footeroverlap.webp"
            alt="Footer overlap decoration"
            width={300}
            height={200}
            unoptimized
            className="absolute -top-[2.5rem] md:-top-[9rem] left-1/2 -translate-x-1/2 z-10 w-[5rem] md:w-[10rem] lg:w-[13rem] h-auto pointer-events-none"
        />

            <div className='bg-black px-4'>
                <footer className="bg-[#131314] w-full max-w-[1350px] mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
                        
                        <div className="lg:col-span-3 space-y-6">
                            <Link href="/" className="block">
                                <Image
                                  src="/aui_dark.svg"
                                  alt="Logo"
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                            </Link>
                            <p className="text-sm/6 text-neutral-300 max-w-96">AUI(Among Us India) is a community for fans of the game Among Us in India.</p>
                            <div className="flex gap-5 md:gap-6 order-1 md:order-2">
                                {/* X (Twitter) */}
                                <a href="https://x.com/amongusindians" className="text-white hover:text-gray-300">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                    </svg>
                                </a>
                                {/* Discord */}
                                <a href="https://discord.gg/amongusindians" className="text-white hover:text-gray-300 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.73 4.36a19.8 19.8 0 0 0-4.9-1.52.07.07 0 0 0-.07.03c-.21.37-.45.85-.62 1.23a18.3 18.3 0 0 0-5.49 0c-.17-.39-.41-.86-.63-1.23a.07.07 0 0 0-.07-.03 19.7 19.7 0 0 0-4.9 1.52.06.06 0 0 0-.03.03C-.13 8.98-.99 13.47-.56 17.9c0 .02.01.04.03.05a19.9 19.9 0 0 0 6 3.03.07.07 0 0 0 .08-.03c.46-.63.87-1.3 1.22-2.01a.07.07 0 0 0-.04-.1 13.1 13.1 0 0 1-1.88-.9.07.07 0 0 1-.01-.12c.13-.1.25-.2.37-.3a.07.07 0 0 1 .07-.01c3.95 1.8 8.22 1.8 12.12 0a.07.07 0 0 1 .07.01c.12.1.24.2.37.3a.07.07 0 0 1-.01.12c-.6.35-1.23.65-1.88.9a.07.07 0 0 0-.04.1c.36.7.77 1.38 1.22 2.01a.07.07 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.07.07 0 0 0 .03-.05c.52-5.12-.87-9.57-3.7-13.51a.06.06 0 0 0-.03-.03ZM8.02 14.78c-1.19 0-2.17-1.09-2.17-2.43s.96-2.43 2.17-2.43c1.22 0 2.19 1.1 2.17 2.43 0 1.34-.96 2.43-2.17 2.43Zm7.96 0c-1.19 0-2.17-1.09-2.17-2.43s.96-2.43 2.17-2.43c1.22 0 2.19 1.1 2.17 2.43 0 1.34-.95 2.43-2.17 2.43Z"/>
                                    </svg>
                                </a>
                                
                                {/* Youtube */}
                                <a href="https://www.youtube.com/@amongusindians" className="text-white hover:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/amongusindians/" className="text-white hover:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12 lg:gap-28 items-start">
                            {/* Products */}
                            <div>
                                <h3 className="font-medium text-sm mb-4">Pages</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
                                    <li><Link href="/" className="hover:text-neutral-400">Home</Link></li>
                                    <li><Link href="/about" className="hover:text-neutral-400">About</Link></li>
                                    <li><Link href="/membership" className="hover:text-neutral-400">Membership</Link></li>
                                    <li><Link href="/forms" className="hover:text-neutral-400">Forms</Link></li>
                                    <li><Link href="/contact" className="hover:text-neutral-400">Contact</Link></li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="font-medium text-sm mb-4">Forms & Applications</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
                                    <li><Link href="/forms/moderation" className="hover:text-neutral-400">Moderation Application</Link></li>
                                    <li><Link href="/forms/unban" className="hover:text-neutral-400">Unban Request</Link></li>
                                    <li><Link href="/forms/staff-report" className="hover:text-neutral-400">Staff Report</Link></li>
                                    <li><Link href="/forms/event-team" className="hover:text-neutral-400">Event Team</Link></li>
                                    <li><Link href="/forms/media-team" className="hover:text-neutral-400">Media Team</Link></li>
                                    <li><Link href="/forms/marshal" className="hover:text-neutral-400">Marshal Application</Link></li>
                                </ul>
                            </div>

                           
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-700 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm">© 2026 Among us India</p>
                        <p className='text-sm text-neutral-400'>All right reserved.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-indigo-500 rounded-full blur-[170px] pointer-events-none"/>
                        <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#6366F1] mt-6" >
                            AUI
                        </h3>
                    </div>
                </footer>
            </div>
    </div>
  );
}