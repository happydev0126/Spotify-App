import { getAuthSession } from "@/utils/getAuthSession";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome to Sclonetify",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-row justify-between w-full bg-background gap-2 p-2">
      <h1>Spotify inside</h1>
      {/* <Dashboard libraries={libraries} /> */}
      {/* <TopTracks topTracks={topTracks} /> */}
      {/* <Card> */}
      {/*   <span>{user.display_name}</span> */}
      {/* </Card> */}
    </main>
  );
}
