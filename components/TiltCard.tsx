"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* Gradient border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-[22px] opacity-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #bf00ff, #ff00aa, #00f0ff)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
      
      {/* Card content */}
      <div
        className="relative glass-card p-8 h-full"
        style={{
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.1) 0%, transparent 50%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Team Member Card
interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  socials?: { icon: string; url: string }[];
}

export function TeamMemberCard({ name, role, image, socials }: TeamMemberProps) {
  return (
    <TiltCard className="w-full">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple opacity-50 blur-lg" />
          <div className="relative w-full h-full rounded-full bg-space-gray overflow-hidden border-2 border-white/10">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gradient">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-white/50 mb-4">{role}</p>

        {/* Socials */}
        {socials && (
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                data-cursor-hover
              >
                <span className="text-sm">{social.icon}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </TiltCard>
  );
}
