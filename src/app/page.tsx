"use client"

import IntroOverlay from "@/components/Intro";
import { SectionAbout } from "@/components/sections/AboutSection";
import { SectionContact } from "@/components/sections/ContactSection";
import { SectionHome } from "@/components/sections/HomeSection";
import { SectionProjects } from "@/components/sections/ProjectsSection";
import { useState } from "react";


export default function Home() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className="relative">
        {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}

        {!showIntro && (
            <main className="-h-screen">
                <SectionHome />
                <SectionAbout />
                <SectionProjects />
                <SectionContact />
            </main>
        )}
        </div>
    );
}