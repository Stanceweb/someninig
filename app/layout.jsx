import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata = {
    title: "Someni Nigeria Limited",
    description: "Someni Nigeria Limited is headquartered in Effurun and delivers engineering and specialist projects across Nigeria.",
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
