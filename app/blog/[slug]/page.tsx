import { client, urlFor } from "@/lib/integrations/sanity/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getPost(slug: string) {

  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      image
    }
  `;

  return await client.fetch(query, { slug });
}

async function getPosts() {

  const query = `
    *[_type == "post"]{
      _id,
      title,
      slug
    }
  `;

  return await client.fetch(query);
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = await getPost(slug);
  const posts = await getPosts();
  const components = {
    block: {
      normal: ({ children }: any) => (
        <p className="mb-4">{children}</p>
      ),

      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
      ),

      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
      ),
    },

    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),

      number: ({ children }: any) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },

    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold">{children}</strong>
      ),

      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
    },
  };
  if (!post) {
    // return <div>Post not found</div>;
    notFound();
  }

  return (
    <div>
      {/* banner section */}
      <section className="relative h-[350px] flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
          {/* <p className="text-xl">Latest articles and updates</p> */}
        </div>

      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-2 py-5 text-sm text-gray-500">

        <Link href="/" className="hover:text-black">
          Home
        </Link>

        <span className="mx-2">/</span>

        <Link href="/blog" className="hover:text-black">
          Blog
        </Link>

        <span className="mx-2">/</span>

        <span className="text-black font-medium">
          {post.title}
        </span>

      </div>
      
      {/* blog section */}
      <section className="max-w-7xl mx-auto py-0 px-2">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            {post.image && (
              <img
                src={urlFor(post.image).url()}
                alt={post.title}
                className="w-full max-h-[450px] object-cover rounded-2xl"
              />
            )}

            <h4 className="text-5xl font-bold mb-8 mt-8">
              {post.title}
            </h4>

            <div className="text-lg leading-8">
              <PortableText
                value={post.content}
                components={components}
              />
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            {/* Recent Blogs */}
            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-5">
                Recent Blogs
              </h3>

              <div className="space-y-4">

                {posts.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/blog/${item.slug.current}`}
                    className="block hover:text-blue-600 transition"
                  >
                    {item.title}
                  </Link>
                ))}

              </div>

            </div>

            {/* Contact Box */}
            <div className="bg-black text-white p-6 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-4">
                Need Help?
              </h3>

              <p className="text-gray-300 mb-6">
                Get in touch with us for more information.
              </p>

              <Link
                href="/contact"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Get In Touch
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}