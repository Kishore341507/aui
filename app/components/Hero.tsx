"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 145;

const currentFrame = (index: number) =>
  `/AUI_Banner_frames/frame_${String(index).padStart(4, "0")}.png`;

// Helper to generate a crisp, solid circular white dot texture
const createCircleTexture = (): THREE.CanvasTexture | null => {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export default function Hero({ memberCount }: { memberCount: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  // --- THREE.JS INTERACTIVE SMALL SOLID WHITE PARTICLES ---
  useEffect(() => {
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create Star Geometry
    const starsCount = 1200;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Circle Texture
    const circleMap = createCircleTexture();

    // Small, 100% Opaque, Bright White Particle Material
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      map: circleMap || undefined,
      transparent: false,
      opacity: 1.0,
      alphaTest: 0.5,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Mouse Tracking Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let scrollProgress = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base idle rotation + scroll acceleration
      starField.rotation.y = elapsedTime * 0.03 + scrollProgress * 1.5;
      starField.rotation.x = elapsedTime * 0.02 + scrollProgress * 0.5;

      // Mouse Parallax
      starField.position.x = targetX * 0.4;
      starField.position.y = targetY * 0.4;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Scroll listener for particle scroll reactivity
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height * 3.5;
      scrollProgress = Math.max(0, Math.min(1, -rect.top / totalScroll));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      if (circleMap) circleMap.dispose();
      renderer.dispose();
    };
  }, []);

  // --- CANVAS FRAME ANIMATION & GSAP TIMELINE ---
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Skip sequence setup entirely on mobile
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    const airbnb = { frame: 0 };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[airbnb.frame];
      if (!img || !img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    };

    images[0].onload = render;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (FRAME_COUNT - 1));
          airbnb.frame = Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex));
          render();
        },
      },
    });

    tl.to(
      leftTextRef.current,
      {
        opacity: 0,
        x: -60,
        duration: 0.25,
        ease: "power2.inOut",
      },
      0.2
    );

    tl.fromTo(
      rightTextRef.current,
      {
        opacity: 0,
        x: 60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      0.65
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#111214] text-white flex items-center justify-center"
    >
      {/* 1. Scroll Sequence Canvas Background (Hidden on mobile) */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* 2. Interactive Three.js Particles Canvas */}
      <canvas
        ref={threeCanvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Content Container Grid */}
      <div className="relative z-20 w-full max-w-7xl h-full px-6 md:px-12 flex items-center justify-between pointer-events-none">
        {/* LEFT TEXT (Welcome Text - Always Visible) */}
        <div
          ref={leftTextRef}
          className="max-w-xl flex flex-col items-start text-left pointer-events-auto"
        >
          {/* Discord Badge */}
          <div className="group relative inline-flex items-center gap-2 rounded-full border border-[#5865F2]/40 bg-[#2B2D31]/80 px-4 py-1 text-sm font-medium text-[#DBDEE1] backdrop-blur-md transition-all hover:border-[#5865F2] hover:bg-[#5865F2]/20 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#5865F2] transition-colors group-hover:text-[#7983F5]"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <span className="relative">
              Introducing <span className="font-semibold text-white">AUI</span>
            </span>
            <div className="absolute inset-0 -z-10 rounded-full bg-[#5865F2]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
            Welcome to <span className="text-[#5865F2]">AUI</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-[#DBDEE1] text-sm sm:text-base md:text-lg leading-relaxed drop-shadow">
            India&apos;s most active Discord server{" "}
            {memberCount ? `with ${memberCount}+ members.` : ""} Join Among Us
            India for tournaments, 24/7 music, and an amazing community experience!
          </p>

          {/* Button */}
          <div className="mt-8">
            <button
              onClick={() =>
                window.open(
                  "https://discord.gg/amongusindians",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="px-6 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition transform hover:scale-105 active:scale-95 shadow-lg shadow-[#5865F2]/25 font-sans"
            >
              Join the Server
            </button>
          </div>
        </div>

        {/* RIGHT TEXT (Second Text - Hidden on Mobile) */}
        <div
          ref={rightTextRef}
          className="hidden md:flex max-w-xl flex-col items-end text-right pointer-events-auto ml-auto opacity-0"
        >
          {/* Secondary Badge */}
          <div className="group relative inline-flex items-center gap-2 rounded-full border border-[#5865F2]/40 bg-[#2B2D31]/80 px-4 py-1 text-sm font-medium text-[#DBDEE1] backdrop-blur-md transition-all hover:border-[#5865F2] hover:bg-[#5865F2]/20 hover:text-white">
            <span className="relative text-[#DBDEE1]">
              The Ultimate Community
            </span>
            <div className="absolute inset-0 -z-10 rounded-full bg-[#5865F2]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
            Play, Connect, & <span className="text-[#5865F2]">Compete</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-[#DBDEE1] text-sm sm:text-base md:text-lg leading-relaxed drop-shadow">
            Step into regular tournaments, active voice channels, and non-stop
            events. Your gaming community is waiting.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={() =>
                window.open(
                  "https://discord.gg/amongusindians",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="px-6 py-3 rounded-lg bg-[#2B2D31] hover:bg-[#35373C] border border-[#5865F2]/50 hover:border-[#5865F2] text-white font-medium transition transform hover:scale-105 active:scale-95 shadow-lg shadow-[#5865F2]/20 font-sans"
            >
              Explore Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}