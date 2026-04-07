"use client"

import IntroOverlay from "../components/Intro";
import { SectionAbout } from "../components/sections/AboutSection";
import { SectionContact } from "../components/sections/ContactSection";
import { SectionHome } from "../components/sections/HomeSection";
import { SectionProjects } from "../components/sections/ProjectsSection";
import { useEffect, useState } from "react";

let hasShownIntroInSession = false;

export default function Home() {
    const [showIntro, setShowIntro] = useState(() => !hasShownIntroInSession);
    const [showMain, setShowMain] = useState(() => hasShownIntroInSession);

    useEffect(() => {
        if (showIntro) {
            return;
        }

        const timeout = setTimeout(() => setShowMain(true), 80);
        return () => clearTimeout(timeout);
    }, [showIntro]);

    function handleIntroDone() {
        hasShownIntroInSession = true;
        setShowIntro(false);
    }

    return (
        <div className="relative">
        {showIntro && <IntroOverlay onDone={handleIntroDone} />}

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
