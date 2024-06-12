import { ClerkProvider, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import './globals.css';
import Card from './components/card';
import Dashboard from './components/dashboard';
import Player from './components/player';
import { auth, clerkClient } from '@clerk/nextjs/server';
import Providers from './deviceContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = auth();
  const provider = 'oauth_spotify';
  const token = await clerkClient.users.getUserOauthAccessToken(userId, provider).then(data => data.data[0].token)

  return (
    <ClerkProvider >
      <html lang="en">
        <body>
          <header>
          </header>
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
              <Providers token={token}>
                <div className='grid h-screen w-full columns-auto grid-cols-[auto,auto] grid-rows-[minmax(0,1fr)] gap-2 overflow-hidden bg-background p-2'>
                  <Dashboard />
                  <Card className='w-fit'>
                    {children}
                  </Card>
                  <Player className={`col-span-full`} token={token} />
                </div>
              </Providers>
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
