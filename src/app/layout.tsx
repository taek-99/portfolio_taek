import { ReactNode } from "react";
import { RouteShell } from "../components/RouteShell";
import "../style/globals.css"

export default function RootLayout({children} : {children: ReactNode}){
    return (
        <html lang='ko'>
            <body className="bg-black">
                <RouteShell>{children}</RouteShell>
            </body>
        </html>
    );
}
