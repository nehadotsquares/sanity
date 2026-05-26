import Link from "next/link";
import { client, urlFor } from "@/lib/integrations/sanity/sanity";

async function getPosts() {

  const query = `
    *[_type == "post"]{
      _id,
      title,
      slug,
      image,
    }
  `;

  return await client.fetch(query);
}

export default async function BlogPage() {

  const posts = await getPosts();

  return (
    <div>

      <section className="relative h-[350px] flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">My Blog</h1>
          <p className="text-xl">Latest articles and updates</p>
        </div>

      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-10 text-center">
          Latest Posts
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>

              <div className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white">

                {/* Image */}
                {post.image && (
                  <img
                    src={urlFor(post.image).width(600).height(400).url()}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-center">
                    {post.title}
                  </h2>

                  {/* <p className="text-gray-500 text-sm">
                    {post.slug.current}
                  </p> */}
                </div>

              </div>

            </Link>
          ))}

        </div>
      </section>
    </div>
  );
}