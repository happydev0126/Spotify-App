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
import { getToken } from "./api/clerk/getToken";
import { ReactNode } from "react";
import { getMostCommonColor } from "./lib/utils/getCommonColor";
import SearchInput from "./components/SearchInput";
import Link from "next/link";

export async function generateMetadata() {
  const { item } = await getCurrentlyPlayingTrack();
  let title = null;

  if (item) {
    title = `${item.name} • ${item.artists[0].name}`;
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

  const response = await getMostCommonColor(
    "https://i.scdn.co/image/ab67616d0000b27313f2466b83507515291acce4",
  );

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="flex h-screen w-screen flex-row justify-between bg-background">
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
                  <div className="flex flex-col w-full">
                    <header className="h-16 flex justify-between p-2 items-center align-center">
                      <div className="flex-1 justify-start">
                        <Link href="/">
                          <div className="h-full w-fit flex items-center gap-2 text-gray-400 rounded-full bg-tag p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              viewBox="0 0 24 24"
                              data-icon="SvgHome"
                              aria-hidden="true"
                            >
                              <path d="M4.75 10.75v9a1.16 1.16 0 00.213.725.717.717 0 00.587.275h12.4a.737.737 0 00.55-.275 1.1 1.1 0 00.25-.725v-9m-16 2l4.5-5 4.5-5 4.5 5 4.5 5m-11.5 8v-5a.945.945 0 011-1h3a.945.945 0 011 1v5"></path>
                            </svg>
                          </div>
                        </Link>
                      </div>
                      <div className="flex flex-1 justify-center gap-2 items-center h-full">
                        <SearchInput placeholder="What do you want to play?" />
                      </div>
                      <div className="flex-1 justify-end flex">
                        <UserButton />
                      </div>
                    </header>
                    <div className="relative w-full columns-auto grid-cols-[minmax(300px,400px),auto] grid-rows-[minmax(0,1fr)] gap-2 bg-background px-2 pb-2 md:grid md:h-screen md:overflow-hidden">
                      <Dashboard />
                      <Card
                        className="w-full h-full pb-20 md:pb-0"
                        style={{
                          background: `linear-gradient(to bottom, ${response} 0%, ${response}80 20%, transparent 100%)`,
                        }}
                      >
                        {children}
                      </Card>
                      <Player token={token} />
                    </div>
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
