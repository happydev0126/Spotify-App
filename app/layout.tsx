import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Card from "./components/ui/Card";
import Dashboard from "./components/Dashboard";
import Player from "./components/Player";
import Providers from "./context/appContext";
import {
  getCurrentUser,
  getCurrentlyPlayingTrack,
} from "./api/spotify/spotify-api";
import Navigation from "./components/Navigation";
import { getToken } from "./api/clerk/getToken";
import Image from "next/image";
import { ReactNode } from "react";

export async function generateMetadata() {
  const { item } = await getCurrentlyPlayingTrack();
  const data = await getCurrentlyPlayingTrack();
  const currentlyPlayingTrack = data.item;
  let title = null;

  if (currentlyPlayingTrack) {
    title = `${currentlyPlayingTrack.name} • ${currentlyPlayingTrack.artists[0].name}`;
  }
  return {
    title: title ? title : "Sclonetify by Jodarini",
    description: "A spotify clone by Jodarini",
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getToken();
  const user = await getCurrentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="flex w-screen h-screen flex-row justify-between bg-background">
            <SignedOut>
              <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
                <h1 className="text-2xl">Spotify clone</h1>
                <SignInButton mode="modal">
                  <button className="w-fit rounded-3xl bg-green p-3 text-background">
                    Sign in with Clerk
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              {user && (
                <Providers token={token} user={user}>
                  <div className="relative md:grid md:h-screen w-full columns-auto grid-cols-[minmax(300px,400px),auto] grid-rows-[minmax(0,1fr)] gap-2 md:overflow-hidden bg-background p-2">
                    <Dashboard />
                    <Card className="h-full pb-20 md:pb-0">
                      <header className="flex justify-between">
                        <Navigation />
                        <Image
                          src="/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png"
                          width={96}
                          height={96}
                          alt="Spotify_Logo_RGB_White"
                        />
                        <UserButton />
                      </header>
                      {children}
                    </Card>
                    <Player token={token} />
                  </div>
                </Providers>
              )}
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
