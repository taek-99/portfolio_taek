import { ReactNode } from "react";
import "@/style/globals.css"

export default function RootLayout({children} : {children: ReactNode}){
    return (
        <html lang='ko'>
            <body>
                {children}
            </body>
        </html>
    );
}