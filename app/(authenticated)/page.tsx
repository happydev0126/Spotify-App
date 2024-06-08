import { getAuthSession } from "@/app/utils/getAuthSession";
import { redirect } from "next/navigation";
import Card from "../components/card";
import { getLibraries, getTopTracks } from "../api/spotify/spotify-api";
import TopTracks from "../components/topTracks"
import Dashboard from "../components/dashboard";
import Image from "next/image";

export const metadata = {
  title: "Welcome to Sclonetify",
};

export default async function Home() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const topTracks = await getTopTracks(session, 5)
  const libraries = await getLibraries(session).then(data => data.items)

  return (
    <div className="flex min-h-screen flex-row justify-between w-full bg-background gap-2 p-2">
      {/* <Image */}
      {/*   src="/spotify-green.png" */}
      {/*   alt="spotify logo" */}
      {/*   width={320} */}
      {/*   height={96} */}
      {/* /> */}
      <Dashboard libraries={libraries} />
      <Card>
        <p>Your top tracks</p>
        <TopTracks topTracks={topTracks} />
      </Card>
    </div>
  );
}
