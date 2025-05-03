import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import frontMatter from 'front-matter';


interface BlogPost {
  title: string;
  date: string;
  thumbnail: string;
  author: string;
  summary: string;
  tags: string[];
  content: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogModule = await import(`../content/blog/${slug}.md?raw`);
        const { attributes, body } = frontMatter(blogModule.default);
        
        setBlog({
          title: attributes.title || '',
          date: attributes.date || '',
          thumbnail: attributes.thumbnail || '',
          author: attributes.author || '',
          summary: attributes.summary || '',
          tags: attributes.tags || [],
          content: body
        });
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>;

  if (!blog) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-2xl text-gray-600">Blog post not found</div>
  </div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="h-80 md:h-96 relative overflow-hidden">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-8 text-white w-full">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow">{blog.title}</h1>
            <div className="flex items-center gap-4 text-gray-200 text-sm mb-2">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags && blog.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-purple-600/80 text-white text-xs px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 fade-in">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-lg max-w-none prose-purple"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-4"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-100 rounded px-1 py-0.5 text-purple-700" {...props}>
                    {children}
                  </code>
                );
              },
              a({ href, children, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 underline hover:text-purple-900"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
        <div className="mt-8">
          <Link
            to="/blog"
            className="inline-block text-purple-700 hover:underline font-medium"
          >
            ← Back to all blogs
          </Link>
        </div>
      </div>
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(24px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default BlogPost; 