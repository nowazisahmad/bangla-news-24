import Link from "next/link";

interface IMostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news: IMostReadNews[] = data.data;
  return (
    <div className="card p-2 bg-base-100 border border-gray-300">
      <h1 className="font-bold text-red-700 mb-3">সর্বাধিক পঠিত</h1>
      <div>
        {news.map((n, i) => (
          <Link key={n.id} href={`/news/${n.id}`}>
            <div className="flex gap-2 items-center">
              <p className="text-2xl font-bold text-red-600">{i + 1}.</p>{" "}
              <h2>{n.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
