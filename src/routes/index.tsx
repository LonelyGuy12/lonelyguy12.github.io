import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Scene3D } from "@/components/Scene3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LONELY — Backend Developer in Cyan & Purple" },
      { name: "description", content: "Backend developer, Android enthusiast, introvert who codes. Crafting elegant systems in cyan and purple." },
      { property: "og:title", content: "LONELY — Backend Developer" },
      { property: "og:description", content: "Backend developer, Android enthusiast, introvert who codes." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <div className="grain relative bg-background text-foreground">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Passions />
        <Cta />
        <Footer />
      </div>
    </SmoothScroll>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-12 py-6 font-mono text-xs uppercase tracking-[0.2em] text-white">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" />
          Lonely / Dev
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="hover:opacity-60 transition">About</a>
          <a href="#stack" className="hover:opacity-60 transition">Stack</a>
          <a href="#passions" className="hover:opacity-60 transition">Passions</a>
        </nav>
        <a
          href="https://github.com/LonelyGuy12"
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-60 transition"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D backdrop */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Vignette overlay for text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 50%, transparent 30%, oklch(0.08 0.02 270 / 0.85) 70%)`
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-32 pb-10"
      >
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[color:var(--cyan)] flex items-center gap-3">
          <span className="w-8 h-px bg-current" />
          Available for work · 33% capacity
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-display italic leading-[0.82] tracking-[-0.04em] text-[clamp(5rem,18vw,18rem)] text-aurora pointer-events-none select-none"
            style={{
              textShadow: '0 0 80px oklch(0.7 0.22 300 / 0.5), 0 0 40px oklch(0.08 0.02 270 / 0.8)'
            }}
          >
            Lonely
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base md:text-xl text-foreground/90"
            style={{
              textShadow: '0 2px 20px oklch(0.08 0.02 270 / 0.9)'
            }}
          >
            Backend developer · Android enthusiast · Introvert who codes
            <span className="block mt-2 text-foreground/70 italic font-display">— in cyan &amp; purple.</span>
          </p>
        </div>

        <div className="flex items-end justify-between gap-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/70">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" />
            Online &amp; coding
          </div>
          <div className="hidden md:block text-right">
            The Lonely One<br />
            <span className="text-foreground/50">Backend Dev</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-[color:var(--cyan)]">
            <span>scroll</span>
            <span className="block w-px h-10 bg-gradient-to-b from-[color:var(--cyan)] to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Backend Dev", "Android", "Python", "Kotlin", "Firebase", "Introvert", "J-Music", "Anime", "Cooking"];
  const row = [...items, ...items, ...items];
  return (
    <section className="relative py-10 border-y border-border/40 overflow-hidden bg-background/60 backdrop-blur-xl">
      <div className="marquee flex whitespace-nowrap gap-12 font-display italic text-5xl md:text-7xl">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-foreground/80">
            {t}
            <span className="text-[color:var(--violet)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-32 md:py-48">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--cyan)] sticky top-32">
            01 / About
          </div>
        </div>
        <div className="md:col-span-9 space-y-10">
          <h2 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight">
            A dev who <em className="text-aurora not-italic font-display italic">whispers</em> to computers.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-lg text-foreground/70 leading-relaxed">
            <p>
              I'm a backend developer who found my calling writing elegant code rather than making small talk.
              My terminal is my happy place, and every bug is just a puzzle waiting to be solved.
            </p>
            <p>
              Apart from coding I love music — cute romantic, EDM, and Japanese songs.
              Anime hits different (slice of life, especially). And I cook up something delicious whenever the kitchen calls.
            </p>
          </div>
          <p className="text-2xl md:text-3xl font-display italic text-foreground/90 max-w-3xl">
            I'm <span className="text-[color:var(--cyan)]">deeply introverted</span> — but I genuinely love when people want to get closer to me. ^^
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {["Backend Dev", "Android", "Anime Fan", "J-Music", "Cooking", "Introvert"].map(t => (
              <span key={t} className="px-4 py-2 rounded-full border border-border/60 text-sm font-mono text-foreground/70 backdrop-blur-sm hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)] transition">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const techs = [
  { name: "Python", role: "Backend", color: "from-yellow-400 to-blue-500" },
  { name: "Discord.py", role: "Bot Dev", color: "from-indigo-400 to-violet-600" },
  { name: "Firebase", role: "Database", color: "from-orange-400 to-yellow-500" },
  { name: "Android", role: "Mobile", color: "from-green-400 to-emerald-600" },
  { name: "Kotlin", role: "Mobile", color: "from-purple-400 to-pink-500" },
  { name: "Git", role: "Version Control", color: "from-red-400 to-orange-500" },
];

function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]), { stiffness: 80, damping: 20 });

  return (
    <section id="stack" ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="px-6 md:px-12 mb-20 max-w-6xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--cyan)] mb-6">
          02 / Tech Stack
        </div>
        <h2 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight">
          What I <em className="text-aurora not-italic italic">build</em> with.
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-6 px-6 md:px-12 will-change-transform">
        {techs.map((t, i) => (
          <div
            key={i}
            className="shrink-0 w-[280px] md:w-[380px] aspect-[3/4] rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md p-8 flex flex-col justify-between hover:border-[color:var(--cyan)]/50 transition-all duration-500 group relative overflow-hidden"
          >
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${t.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />
            <div className="font-mono text-xs text-foreground/40">0{i + 1}</div>
            <div className="relative">
              <div className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-2">{t.role}</div>
              <h3 className="font-display text-5xl md:text-6xl text-foreground">{t.name}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

const passions = [
  {
    title: "Music",
    color: "var(--cyan)",
    body: "Cute romantic tunes, EDM that makes my code dance, and Japanese songs that hit different at 2AM.",
    tags: ["J-Pop", "EDM", "Romantic"],
  },
  {
    title: "Anime",
    color: "var(--violet)",
    body: "Slice of life and romance are my comfort zone. Stories that make you feel things quietly — those are the best.",
    tags: ["Slice of Life", "Romance"],
  },
  {
    title: "Coding",
    color: "var(--pink)",
    body: "Backend magic and Android adventures. I talk to computers better than people — and I'm completely at peace with that.",
    tags: ["Backend", "Android"],
  },
  {
    title: "Cooking",
    color: "var(--cyan)",
    body: "Debugging recipes with the same enthusiasm as debugging code. Both require patience, creativity, and good taste.",
    tags: ["Creative", "Therapeutic"],
  },
];

function Passions() {
  return (
    <section id="passions" className="relative px-6 md:px-12 py-32 md:py-48">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--cyan)] mb-6">
          03 / Off the Clock
        </div>
        <h2 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight mb-20">
          Playful passions <em className="text-aurora not-italic italic">in neon.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {passions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="relative p-10 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden group"
            >
              <div
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(400px circle at 50% 0%, oklch(from ${p.color} l c h / 0.25), transparent 70%)` }}
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center" style={{ background: `oklch(from ${p.color} l c h / 0.15)`, border: `1px solid oklch(from ${p.color} l c h / 0.4)` }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: `oklch(from ${p.color} l c h)` }} />
                </div>
                <h3 className="font-display text-4xl md:text-5xl mb-4" style={{ color: `oklch(from ${p.color} l c h)` }}>
                  {p.title}
                </h3>
                <p className="text-foreground/70 text-lg leading-relaxed mb-6 max-w-md">{p.body}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-mono text-foreground/60 border border-border/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setM({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative px-6 md:px-12 py-40 md:py-64 overflow-hidden"
    >
      <div
        className="absolute pointer-events-none rounded-full blur-3xl transition-opacity"
        style={{
          left: m.x - 300,
          top: m.y - 300,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, oklch(0.7 0.22 300 / 0.35), transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto text-center relative">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--cyan)] mb-8">
          let's talk
        </p>
        <h2 className="font-display text-[clamp(3rem,12vw,12rem)] leading-[0.85] tracking-[-0.03em]">
          <span className="text-aurora italic">say</span>
          <br />
          <span className="text-foreground">hi.</span>
        </h2>
        <p className="mt-8 text-foreground/60 max-w-md mx-auto">
          Coffee, code, or just a quiet conversation. The terminal is always open.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/LonelyGuy12"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-foreground font-mono uppercase tracking-widest text-xs hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)] transition"
          >
            <img src="https://api.iconify.design/simple-icons/github.svg?color=%23e2e8f0" alt="" width="14" height="14" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lonely-guy/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-foreground font-mono uppercase tracking-widest text-xs hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)] transition"
          >
            <img src="https://api.iconify.design/simple-icons/linkedin.svg?color=%2300a0dc" alt="" width="14" height="14" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="https://discord.com/users/886120777630486538"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-foreground font-mono uppercase tracking-widest text-xs hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)] transition"
          >
            <img src="https://api.iconify.design/simple-icons/discord.svg?color=%237289da" alt="" width="14" height="14" aria-hidden="true" />
            Discord
          </a>
          <a
            href="https://www.instagram.com/lonelyguy7973/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-foreground font-mono uppercase tracking-widest text-xs hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)] transition"
          >
            <img src="https://api.iconify.design/simple-icons/instagram.svg?color=%23e4405f" alt="" width="14" height="14" aria-hidden="true" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
          © {new Date().getFullYear()} Lonely
        </span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/LonelyGuy12" target="_blank" rel="noreferrer" className="hover:opacity-60 transition opacity-70" aria-label="GitHub">
            <img src="https://api.iconify.design/simple-icons/github.svg?color=%23e2e8f0" alt="" width="16" height="16" />
          </a>
          <a href="https://www.linkedin.com/in/lonely-guy/" target="_blank" rel="noreferrer" className="hover:opacity-60 transition opacity-70" aria-label="LinkedIn">
            <img src="https://api.iconify.design/simple-icons/linkedin.svg?color=%2300a0dc" alt="" width="16" height="16" />
          </a>
          <a href="https://discord.com/users/886120777630486538" target="_blank" rel="noreferrer" className="hover:opacity-60 transition opacity-70" aria-label="Discord">
            <img src="https://api.iconify.design/simple-icons/discord.svg?color=%237289da" alt="" width="16" height="16" />
          </a>
          <a href="https://www.instagram.com/lonelyguy7973/" target="_blank" rel="noreferrer" className="hover:opacity-60 transition opacity-70" aria-label="Instagram">
            <img src="https://api.iconify.design/simple-icons/instagram.svg?color=%23e4405f" alt="" width="16" height="16" />
          </a>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" />
          Online
        </span>
      </div>
    </footer>
  );
}
