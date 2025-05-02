import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <div className="h-96 relative overflow-hidden">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-4xl mx-auto px-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-gray-200">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter style={atomDark} language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className}>{children}</code>
                  );
                }
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 