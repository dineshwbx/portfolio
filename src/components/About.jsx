import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Palette,
  Smartphone,
  Zap,
  Server,
  Clock,
  Award,
  Users,
  Brain,
  Database,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RotatingCube = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        skillsRef.current?.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: "Python / React", level: 90, icon: Code2 },
    { name: "AI / ML Implementation", level: 75, icon: Brain },
    { name: "Node.js / Express", level: 85, icon: Server },
    { name: "MySQL / PostgreSQL", level: 82, icon: Database },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full pt-12 pb-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 md:mb-4">
            About{" "}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
              Me
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div ref={contentRef} className="space-y-5 md:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-tight">
              I'm Dinesh, a <span className="text-yellow-500">AI/ML Engineer</span>
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I specialize in bridging the gap between sophisticated design and complex technical 
              architecture. My journey involves creating seamless web applications while 
              continuously expanding my expertise into the realm of <strong>AI and Machine Learning</strong>.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I thrive on building scalable solutions using the MERN stack and Next.js, 
              now integrating intelligent data models to create more "aware" user 
              experiences. Whether it's crafting an immersive 3D interface or 
              optimizing a backend database, my goal is always to deliver fast, 
              future-proof products.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <Brain size={16} className="text-yellow-500 shrink-0" />
                <span className="text-xs sm:text-sm">AI/ML Engineer</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                <Code2 size={16} className="text-blue-500 shrink-0" />
                <span className="text-xs sm:text-sm">Full Stack Developer</span>
              </div>
            </div>
          </div>

          <div ref={skillsRef} className="space-y-5 md:space-y-6 mt-6 lg:mt-0">
            <h3 className="text-xl md:text-2xl font-light text-white mb-4 md:mb-6">
              Technical Expertise
            </h3>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon size={14} className="text-gray-400" />
                      <span className="text-gray-300 text-sm md:text-base">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs md:text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;