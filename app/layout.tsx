import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// Import the fonts
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI math tutor with Quiz generator function',
  description: 'Created by ROUGUI Othmane',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${geist.className}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" enableSystem forcedTheme="dark">
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
