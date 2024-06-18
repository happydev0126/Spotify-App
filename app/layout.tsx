import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';
import Card from './components/card';
import Dashboard from './components/dashboard';
import Player from './components/player';
import { auth, clerkClient } from '@clerk/nextjs/server';
import Providers from './appContext';
import { getCurrentUser } from './api/spotify/spotify-api';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = auth();
  let token = ''
  let user
  if (userId) {
    const provider = 'oauth_spotify';
    token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)
    user = await getCurrentUser(token)
  }
  if (!user) {
    return
  }

  return (
    <ClerkProvider >
      <html lang="en">
        <body>
          <main className='flex h-screen flex-row justify-between bg-background'>
            <SignedOut>
              <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl'>Spotify clone</h1>
                <SignInButton mode='modal' >
                  <button className='w-fit rounded-3xl bg-green p-3 text-background'>Sign in with Clerk</button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Providers token={token} user={user}>
                <div className='grid h-screen w-full columns-auto grid-cols-[minmax(300px,400px),auto] grid-rows-[minmax(0,1fr)] gap-2 overflow-hidden bg-background p-2'>
                  <Dashboard />
                  <Card className='w-full'>
                    <header className="flex justify-between">
                      <div className="flex flex-row gap-4 text-gray-400">
                        <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgChevronLeft" aria-hidden="true"><path d="M14.9 6L12 9l-2.9 3 2.9 3 2.9 3"></path></svg></button>
                        <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgChevronRight" aria-hidden="true"><path d="M9.1 18l2.9-3 2.9-3L12 9 9.1 6"></path></svg></button>
                      </div>
                      <img src="/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png" className='w-24' alt="Spotify_Logo_RGB_White" />
                      <UserButton />
                    </header>
                    {children}
                  </Card>
                  <Player className='col-span-full' /> </div>
              </Providers>
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
