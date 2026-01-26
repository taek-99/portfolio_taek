import { ReactNode } from "react";
import "@/style/globals.css"

export default function RootLayout({children} : {children: ReactNode}){
    return (
        <html lang='ko'>
            <body>
            <main className="min-w-7xl mx-auto px-6 bg-black">
                {children}
            </main> 
            </body>
        </html>
    );
}