import React, { useEffect, useRef, useState, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Microscope, Building2, Shield, CalendarDays, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FloatingOrb = memo(({ color, position }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
});

const Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.config({ limitCallbacks: true });

      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(project,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: project,
                start: "top 95%",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allProjects = [
    {
      title: 'Elite Insurance',
      category: 'Financial Services Platform',
      description: 'A professional insurance portal featuring policy browsing, lead generation, and comprehensive coverage details.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Lucide'],
      liveUrl: 'https://elite-insurance.vercel.app/',
      color: 'from-blue-700 to-indigo-800',
      icon: Shield,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      status: 'Live'
    },
    {
      title: 'Benny Events',
      category: 'Event Management Platform',
      description: 'Complete event management and booking platform with real-time availability, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      liveUrl: 'https://benny-events.vercel.app/',
      color: 'from-blue-600 to-cyan-600',
      icon: CalendarDays,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      status: 'Live'
    },
    {
      title: 'Neo Diagnostic Lab',
      category: 'Healthcare Platform',
      description: 'Comprehensive diagnostic lab management system with online test booking, report viewing, and patient management.',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux', 'PDF Generation'],
      liveUrl: 'https://neo-lab-1711.web.app/',
      color: 'from-purple-600 to-pink-600',
      icon: Microscope,
      gradient: 'from-purple-500/20 to-pink-500/20',
      status: 'Live'
    },
    {
      title: 'Modern Hotel Booking',
      category: 'Hospitality Solution',
      description: 'An premium hotel reservation system with interactive room selections and real-time booking capabilities.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['React', 'Prisma', 'PostgreSQL', 'Tailwind'],
      liveUrl: '#',
      color: 'from-amber-600 to-orange-600',
      icon: Building2,
      gradient: 'from-amber-500/20 to-orange-500/20',
      status: 'Work in Progress'
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative w-full pt-12 pb-20 overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} />
          <FloatingOrb color="#3b82f6" position={[-4, 2, -5]} />
          <FloatingOrb color="#8b5cf6" position={[4, -1, -5]} />
          <FloatingOrb color="#ec4899" position={[0, 3, -8]} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
            My <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Selected works and enterprise solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project, index) => {
            const Icon = project.icon;
            const isWIP = project.status === 'Work in Progress';
            
            return (
              <div
                key={index}
                ref={el => projectsRef.current[index] = el}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-linear-to-t ${project.gradient} opacity-90`} />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] text-white font-medium flex items-center space-x-1.5 ${isWIP ? 'bg-amber-500/80' : 'bg-green-500/80'}`}>
                    {!isWIP && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                    <span>{project.status}</span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center border border-white/20">
                      <Icon className="text-white w-5 h-5 sm:w-6" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-blue-400 mb-3 font-medium">{project.category}</p>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2.5 py-1 bg-white/10 rounded-full text-[10px] text-gray-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-start">
                    <a
                      href={project.liveUrl}
                      target={isWIP ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
                        isWIP 
                        ? 'bg-white/10 cursor-default opacity-70' 
                        : 'bg-linear-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg shadow-blue-500/20'
                      }`}
                    >
                      <span>{isWIP ? 'Coming Soon' : 'View Live Project'}</span>
                      {isWIP ? <Rocket size={14} /> : <ExternalLink size={14} />}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Project;