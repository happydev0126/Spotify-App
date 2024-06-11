import { ClerkProvider, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import './globals.css';
import Card from './components/card';
// import { auth, clerkClient } from '@clerk/nextjs/server';
// import { CurrentUserPlaylistItem, Item } from './types/spotify';
// import { getCurrentUserPlaylists, getRecentlyPlayed } from './api/spotify/spotify-api';
import Dashboard from './components/dashboard';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider >
      <html lang="en">
        <body>
          <header>
          </header>
          <main className='flex min-h-screen w-full flex-row justify-between gap-2 bg-background p-2'>
            <SignedOut>
              <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl'>Spotify clone</h1>
                <SignInButton mode='modal' >
                  <button className='w-fit rounded-3xl bg-green p-3 text-background'>Sign in with Clerk</button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className='flex min-h-screen w-full flex-row justify-between gap-2 bg-background p-2'>
                <Dashboard />
                <Card>
                  {children}
                </Card>
              </div>
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
