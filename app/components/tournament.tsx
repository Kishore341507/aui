
"use client";

import { useEffect, useRef, useState } from "react";

const Image = ({
  src,
  alt,
  fill,
  className = "",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={
      fill
        ? {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }
        : undefined
    }
  />
);

/* Word-by-word description reveal: gray to white on scroll */
function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;

      const newProgress = Math.max(
        0,
        Math.min(1, currentPosition / totalDistance)
      );

      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const words = text.split(/\s+/);

  return (
    <p
      ref={containerRef}
      className="mx-auto max-w-5xl text-center text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;

        return (
          <span
            key={`${word}-${index}`}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "#ffffff" : "#737373",
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/valorant.webp",
    alt: "Valorant gaming community",
    position: "left",
  },
  {
    src: "/brawlhalla.jpg",
    alt: "Brawlhalla gaming community",
    position: "left",
  },
  {
    src: "/minecraft1.jpg",
    alt: "Minecraft gaming community",
    position: "right",
  },
  {
    src: "/amongus1.jpg",
    alt: "Among Us gaming community",
    position: "right",
  },
];

const headlineLines = [
  "We Bring Players",
  "Together.",
  "We Create the Moments.",
];

export default function TournamentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const descriptionText =
    "At Among Us India, we bring players together through organized tournaments, community events, and custom games. We plan the matches, create the excitement, and give crewmates a place to connect, compete, and make memories.";

  /* Track scroll progress for the hero animation */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;

      const progress = Math.max(
        0,
        Math.min(1, scrolled / scrollableHeight)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Expand the center image and reveal the side images */
  const imageProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.2) / 0.8)
  );

  const centerWidth = 100 - imageProgress * 58;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;

  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;

  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative bg-black p-0 text-white"
    >
      {/* Sticky hero animation */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * 16}px`,
            }}
          >
            {/* Left image panels */}
            <div
              className="flex min-w-0 flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img) => (
                  <div
                    key={img.src}
                    className="relative min-h-0 overflow-hidden will-change-transform"
                    style={{
                      flex: 1,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Center tournament image */}
            <div
              className="relative min-w-0 shrink-0 overflow-hidden bg-black will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/tournament.avif"
                alt="Among Us India community tournaments"
                fill
                className="object-cover"
              />

              {/* Blackish blur overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px]" />

              {/* Cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />

              {/* Hero text and scroll fade */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center sm:px-8">
                <p
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/75 sm:text-sm md:text-base"
                  style={{
                    opacity: Math.max(0, 1 - scrollProgress * 5),
                  }}
                >
                  Among Us India Community
                </p>

                <h2 className="max-w-5xl text-5xl font-medium leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {headlineLines.map((line, index) => {
                    const fadeStart = index * 0.07;
                    const fadeEnd = fadeStart + 0.07;

                    const wordProgress = Math.max(
                      0,
                      Math.min(
                        1,
                        (scrollProgress - fadeStart) /
                          (fadeEnd - fadeStart)
                      )
                    );

                    return (
                      <span
                        key={line}
                        className="inline-block"
                        style={{
                          opacity: 1 - wordProgress,
                          filter: `blur(${wordProgress * 10}px)`,
                          transition:
                            "opacity 0.1s linear, filter 0.1s linear",
                          color: "#ffffff",
                        }}
                      >
                        {line}
                        {index < headlineLines.length - 1 && <br />}
                      </span>
                    );
                  })}
                </h2>

                <p
                  className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
                  style={{
                    opacity: Math.max(0, 1 - scrollProgress * 5),
                  }}
                >
                  We organize the tournaments. You make the memories.
                </p>
              </div>
            </div>

            {/* Right image panels */}
            <div
              className="flex min-w-0 flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img) => (
                  <div
                    key={img.src}
                    className="relative min-h-0 overflow-hidden will-change-transform"
                    style={{
                      flex: 1,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space for the sticky hero animation */}
      <div className="h-[200vh]" />

      {/* Description section with word-by-word reveal */}
      <div className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/50 sm:text-sm">
            More Than Just a Game
          </p>

          {/* Keep this component to preserve the text reveal effect */}
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
