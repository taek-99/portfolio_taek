import { ReactNode } from "react";
import "../style/globals.css"

export default function RootLayout({children} : {children: ReactNode}){
    return (
        <html lang='ko'>
            <body className="bg-black">
                {children}
            </body>
        </html>
    );
}
