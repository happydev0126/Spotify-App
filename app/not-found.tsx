import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col">
      <h2>Could not find requested resource</h2>
      <Link
        href="/"
        className="w-max rounded-full bg-green/80 px-4 py-2 hover:bg-green"
      >
        Return Home
      </Link>
    </div>
  );
}
