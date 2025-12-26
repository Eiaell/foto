import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FotoAI - Generador de Imágenes con IA",
  description: "Crea imágenes extraordinarias con DALL·E, Midjourney, Leonardo AI, FLUX y más. Con mejora automática de prompts y consistencia de personajes.",
  keywords: ["AI", "imagen", "generador", "DALL-E", "Midjourney", "Leonardo AI", "FLUX"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
