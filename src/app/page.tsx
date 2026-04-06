"use client"

import IntroOverlay from "../components/Intro";
import { SectionAbout } from "../components/sections/AboutSection";
import { SectionContact } from "../components/sections/ContactSection";
import { SectionHome } from "../components/sections/HomeSection";
import { SectionProjects } from "../components/sections/ProjectsSection";
import { useEffect, useState } from "react";


export default function Home() {
    const [showIntro, setShowIntro] = useState(true);
    const [showMain, setShowMain] = useState(false);

    useEffect(() => {
        if (showIntro) {
            return;
        }

        const timeout = setTimeout(() => setShowMain(true), 80);
        return () => clearTimeout(timeout);
    }, [showIntro]);

    return (
        <div className="relative">
        {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}

            <main
                className={`min-h-screen transition-opacity duration-700 ${
                    showMain ? "opacity-100" : "opacity-0"
                }`}
            >
                <SectionHome />
                <SectionAbout />
                <SectionProjects />
                <SectionContact />
            </main>
        </div>
    );
}
