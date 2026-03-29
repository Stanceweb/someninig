import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata = {
    title: "Someni Nigeria Limited",
    description: "Leading construction and engineering solutions in Nigeria.",
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
