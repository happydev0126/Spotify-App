import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';
import Card from './components/ui/Card';
import Dashboard from './components/Dashboard';
import Player from './components/Player';
import Providers from './context/appContext';
import { getCurrentUser, getCurrentlyPlayingTrack } from './api/spotify/spotify-api';
import Navigation from './components/Navigation';
import { getToken } from './api/clerk/getToken';

export async function generateMetadata() {
  const { item } = await getCurrentlyPlayingTrack()
  let title = null

  if (item) {
    title = `${item.name} • ${item.artists[0].name}`
  }
  return {
    title: title ? title : 'Sclonetify by Jodarini',
    description: 'A spotify clone by Jodarini',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const token = await getToken()
  const user = await getCurrentUser()

  return (
    <ClerkProvider >
      <html lang="en">
        <body>
          <main className='flex md:h-screen flex-row justify-between bg-background'>
            <SignedOut>
              <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl'>Spotify clone</h1>
                <SignInButton mode='modal' >
                  <button className='w-fit rounded-3xl bg-green p-3 text-background'>Sign in with Clerk</button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              {user &&
                <Providers token={token} user={user}>
                  <div className='flex flex-col md:grid md:h-screen w-full columns-auto grid-cols-[minmax(300px,400px),auto] grid-rows-[minmax(0,1fr)] gap-2 md:overflow-hidden bg-background p-2'>
                    <Dashboard />
                    <Card className='w-full'>
                      <header className="flex justify-between">
                        <Navigation />
                        <img src="/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png" className='w-24' alt="Spotify_Logo_RGB_White" />
                        <UserButton />
                      </header>
                      {children}
                    </Card>
                    <Player className='col-span-full' token={token} />
                  </div>
                </Providers>
              }
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
