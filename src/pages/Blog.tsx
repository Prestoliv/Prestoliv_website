import { PageMeta } from "@/components/PageMeta";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
};

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

const formatDate = (value: string | null) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Blog = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <>
      <PageMeta
        title="Blog | Prestoliv"
        description="Insights on home construction in Hyderabad — transparent building, 3D walkthroughs, and tips for building your dream home with Prestoliv."
        ogUrl="https://www.prestoliv.com/blog"
      />
      <main id="page-blog" className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageHero
          eyebrow="Blog"
          title="Notes from the build."
          subtitle="Insights, updates, and practical advice on building your home in Hyderabad — straight from the Prestoliv team."
        />

        <section id="blog-list" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading posts…</p>
            )}

            {isError && (
              <p className="text-muted-foreground">
                We couldn't load the posts right now. Please try again later.
              </p>
            )}

            {!isLoading && !isError && (!posts || posts.length === 0) && (
              <p className="text-muted-foreground">No posts yet. Check back soon.</p>
            )}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-md hairline bg-card shadow-soft transition-all duration-300 hover:shadow-2xl"
                  >
                    {post.cover_image && (
                      <div className="overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {formatDate(post.published_at)}
                      </p>
                      <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-block text-sm font-medium text-brand">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CtaFooter />
      </main>
    </>
  );
};

export default Blog;
