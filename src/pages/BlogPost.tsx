import { PageMeta } from "@/components/PageMeta";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
};

const fetchPost = async (slug: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, excerpt, cover_image, published_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
};

const formatDate = (value: string | null) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug as string),
    enabled: !!slug,
  });

  return (
    <>
      <PageMeta
        title={post ? `${post.title} | Prestoliv Blog` : "Blog | Prestoliv"}
        description={post?.excerpt ?? "Insights on home construction in Hyderabad from Prestoliv."}
        ogUrl={`https://www.prestoliv.com/blog/${slug ?? ""}`}
      />
      <main id="page-blog-post" className="min-h-screen bg-background text-foreground">
        <Navbar />

        <article className="mx-auto max-w-3xl px-6 py-28">
          <Link
            to="/blog"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            ← Back to blog
          </Link>

          {isLoading && (
            <p className="mt-10 text-muted-foreground">Loading…</p>
          )}

          {isError && (
            <p className="mt-10 text-muted-foreground">
              We couldn't load this post right now. Please try again later.
            </p>
          )}

          {!isLoading && !isError && !post && (
            <div className="mt-10">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Post not found
              </h1>
              <p className="mt-3 text-muted-foreground">
                This post may have been moved or removed.
              </p>
            </div>
          )}

          {post && (
            <>
              <header className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {formatDate(post.published_at)}
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
                  {post.title}
                </h1>
              </header>

              {post.cover_image && (
                <div className="mt-10 overflow-hidden rounded-[24px] border border-border/60 shadow-soft">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              )}

              <div className="mt-10 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {post.content}
              </div>
            </>
          )}
        </article>

        <CtaFooter />
      </main>
    </>
  );
};

export default BlogPost;
