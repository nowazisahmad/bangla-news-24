import Image from "next/image";
import { notFound } from "next/navigation";

type Byline = {
  name: string;
  role?: string;
};

type Topic = {
  id?: string;
  name: string;
};

type BodyItem = {
  type: "text" | "subheading" | "image";
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
};

type News = {
  id: string;
  title: string;
  description?: string | unknown;
  text?: string;
  link?: string;
  firstPublished?: string;
  lastPublished?: string;
  byline?: Byline[];
  topics?: Topic[];
  tags?: string[];
  imageUrl?: string;
  body?: BodyItem[];
  wordCount?: number;
  source?: string;
  sourceUrl?: string;
};

const extractUrl = (value?: string) => {
  if (!value) return "";
  const match = value.match(/\((https?:\/\/[^)]+)\)/);

  return match ? match[1] : value;
};

const formatDate = (date?: string) => {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const apiUrl = `https://news-api-v2.vercel.app/api/article/${newsId}`;

  let news: News | null = null;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      // console.error("News API response error:", res.status);
      notFound();
    }

    const result = await res.json();

    news = result?.data ?? null;
  } catch (error) {
    // console.error("NEWS API ERROR:", error);

    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            News load করা যাচ্ছে না
          </h1>

          <p className="mt-3 text-gray-600">
            News API বর্তমানে unavailable। কিছুক্ষণ পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

  if (!news) {
    notFound();
  }
  const mainImage = extractUrl(news.imageUrl);
  const description =
    typeof news.description === "string" ? news.description : news.text || "";

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {news.topics && news.topics.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {news.topics.map((topic, index) => (
              <span
                key={topic.id || index}
                className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600"
              >
                {topic.name}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {news.title}
        </h1>
        {description && (
          <p className="mt-5 text-lg leading-8 text-gray-600 sm:text-xl">
            {description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-gray-200 pb-6 text-sm text-gray-500">
          {news.byline && news.byline.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-700">লেখক:</span>

              {news.byline.map((author, index) => (
                <span key={index}>
                  {author.name}
                  {author.role && ` (${author.role})`}
                  {index < news.byline!.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
          {news.firstPublished && (
            <div>
              <span className="font-semibold text-gray-700">প্রকাশিত:</span>{" "}
              {formatDate(news.firstPublished)}
            </div>
          )}
        </div>
        {mainImage && (
          <figure className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src={mainImage}
              alt={news.title}
              width={1200}
              height={675}
              priority
              className="h-auto w-full object-cover"
            />
          </figure>
        )}
        {news.body && news.body.length > 0 && (
          <div className="mt-8">
            {news.body.map((item, index) => {
              if (item.type === "image") {
                const imageUrl = extractUrl(item.url);
                const firstImageIndex = news.body!.findIndex(
                  (bodyItem) => bodyItem.type === "image",
                );
                if (index === firstImageIndex) {
                  return null;
                }
                if (!imageUrl) {
                  return null;
                }
                return (
                  <figure key={index} className="my-8 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.altText || news.title}
                      width={item.width || 1200}
                      height={item.height || 675}
                      className="h-auto w-full rounded-xl object-cover"
                    />
                    {item.caption && (
                      <figcaption className="mt-2 text-sm text-gray-500">
                        {item.caption}
                      </figcaption>
                    )}
                    {item.copyrightHolder && (
                      <p className="mt-1 text-xs text-gray-400">
                        © {item.copyrightHolder}
                      </p>
                    )}
                  </figure>
                );
              }
              if (item.type === "subheading") {
                return (
                  <h2
                    key={index}
                    className="my-8 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
                  >
                    {item.text}
                  </h2>
                );
              }
              if (item.type === "text") {
                if (!item.text?.trim()) {
                  return null;
                }
                return (
                  <p
                    key={index}
                    className="mb-6 text-lg leading-8 text-gray-800"
                  >
                    {item.text}
                  </p>
                );
              }
              return null;
            })}
          </div>
        )}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Tags</h3>

            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 rounded-2xl bg-gray-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              {news.source && (
                <p className="font-semibold text-gray-800">
                  Source: {news.source}
                </p>
              )}
              {news.wordCount && (
                <p className="mt-1 text-sm text-gray-500">
                  Word count: {news.wordCount}
                </p>
              )}
            </div>
            {news.sourceUrl && (
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                মূল খবর দেখুন
              </a>
            )}
          </div>
        </div>
        {news.link && (
          <div className="mt-5 text-sm text-gray-500">
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-red-600 hover:underline"
            >
              {news.link}
            </a>
          </div>
        )}
      </article>
    </main>
  );
};

export default NewsDetails;
