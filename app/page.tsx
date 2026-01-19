"use client";

import dynamic from "next/dynamic";

// Disable static generation
export const dynamic_config = 'force-dynamic';
import { Navigation } from "@/components/Navigation";
import { 
  AnimatedText, 
  TypewriterText, 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem 
} from "@/components/AnimatedText";
import { TiltCard, TeamMemberCard } from "@/components/TiltCard";
import { ConversationalForm } from "@/components/ConversationalForm";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Dynamic import for Hero3D to avoid SSR issues
const Hero3D = dynamic(() => import("@/components/Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-dark to-space-black" />
  ),
});

// Services data
const services = [
  {
    icon: "🚀",
    title: "Web Applications",
    description: "Scalable, performant web apps built with cutting-edge technologies.",
  },
  {
    icon: "📱",
    title: "Mobile Development",
    description: "Native and cross-platform mobile experiences that users love.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that convert visitors into customers.",
  },
  {
    icon: "⚡",
    title: "Performance",
    description: "Lightning-fast experiences optimized for every device and network.",
  },
  {
    icon: "🔒",
    title: "Security",
    description: "Enterprise-grade security built into every layer of your product.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description: "Intelligent features powered by the latest in machine learning.",
  },
];

// Team data
const team = [
  { name: "Alex Chen", role: "Founder & CEO", socials: [{ icon: "𝕏", url: "#" }, { icon: "in", url: "#" }] },
  { name: "Sarah Kim", role: "Lead Designer", socials: [{ icon: "𝕏", url: "#" }, { icon: "in", url: "#" }] },
  { name: "Marcus Johnson", role: "Tech Lead", socials: [{ icon: "𝕏", url: "#" }, { icon: "in", url: "#" }] },
  { name: "Emma Wilson", role: "Product Manager", socials: [{ icon: "𝕏", url: "#" }, { icon: "in", url: "#" }] },
];

// Projects data
const projects = [
  { title: "Quantum Finance", category: "Fintech", year: "2024" },
  { title: "Neural Health", category: "Healthcare", year: "2024" },
  { title: "Stellar Commerce", category: "E-commerce", year: "2023" },
  { title: "Echo Social", category: "Social Media", year: "2023" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main className="relative">
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <Hero3D />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs text-white/60 uppercase tracking-wider">
              Now accepting new projects
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="hero-title mb-6">
            <TypewriterText
              text="We Build"
              className="block text-white/90"
              delay={0.5}
              charDelay={0.05}
            />
            <TypewriterText
              text="The Future"
              className="block text-gradient"
              delay={1.2}
              charDelay={0.05}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12"
          >
            A state-of-the-art development agency crafting digital experiences
            that push the boundaries of what's possible.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact" className="neon-button" data-cursor-hover>
              Start a Project
            </a>
            <a
              href="#work"
              className="px-8 py-4 text-sm text-white/60 hover:text-white transition-colors"
              data-cursor-hover
            >
              View Our Work →
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="scroll-indicator"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="scroll-indicator-line" />
        </motion.div>
      </section>

      {/* ===== WORK SECTION ===== */}
      <section id="work" className="section bg-space-dark">
        <div className="container mx-auto">
          <FadeInUp>
            <span className="text-neon-cyan text-sm uppercase tracking-widest mb-4 block">
              Selected Work
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="section-title text-gradient mb-16">
              Projects that define industries
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
            {projects.map((project, index) => (
              <StaggerItem key={project.title}>
                <TiltCard className="group">
                  <div className="aspect-[16/10] bg-space-gray rounded-lg mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-white/40">{project.category}</p>
                    </div>
                    <span className="text-sm text-white/20">{project.year}</span>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeInUp>
                <span className="text-neon-purple text-sm uppercase tracking-widest mb-4 block">
                  What We Do
                </span>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h2 className="section-title mb-6">
                  Full-stack expertise for{" "}
                  <span className="text-gradient">ambitious projects</span>
                </h2>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="section-subtitle">
                  From concept to launch, we handle every aspect of your digital
                  product with precision and creativity.
                </p>
              </FadeInUp>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <div className="glass-card p-6 h-full group" data-cursor-hover>
                    <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">
                      {service.icon}
                    </span>
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-white/50">{service.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE SECTION ===== */}
      <section className="py-20 overflow-hidden border-y border-white/5">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-bold text-white/5 uppercase"
            >
              Innovation • Design • Development • Strategy •
            </span>
          ))}
        </motion.div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section id="team" className="section bg-space-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="text-neon-pink text-sm uppercase tracking-widest mb-4 block">
                The Team
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="section-title">
                Meet the <span className="text-gradient">minds</span> behind the magic
              </h2>
            </FadeInUp>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <TeamMemberCard {...member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="section">
        <div className="container mx-auto">
          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            staggerDelay={0.1}
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "12", label: "Team Members" },
              { value: "5", label: "Years of Excellence" },
            ].map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section bg-space-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="text-neon-green text-sm uppercase tracking-widest mb-4 block">
                Get in Touch
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="section-title mb-4">
                Let's build something{" "}
                <span className="text-gradient">extraordinary</span>
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="section-subtitle mx-auto">
                Have a project in mind? We'd love to hear about it.
              </p>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.3}>
            <ConversationalForm />
          </FadeInUp>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold">
              <span className="text-gradient">NEXUS</span>
            </div>

            <div className="flex items-center gap-8">
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                  data-cursor-hover
                >
                  {social}
                </a>
              ))}
            </div>

            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} NEXUS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
