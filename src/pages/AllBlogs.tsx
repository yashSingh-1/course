import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import frontMatter from 'front-matter';

interface BlogPost {
  title: string;
  date: string;
  thumbnail: string;
  author: string;
  summary: string;
  tags?: string[];
  slug: string;
  content: string;
}

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogModules = import.meta.glob('../content/blog/*.md', { as: 'raw', eager: true });
        const blogPosts: BlogPost[] = [];
        
        for (const path in blogModules) {
          const content = blogModules[path] as string;
          const { attributes, body } = frontMatter(content);
          const filename = path.split('/').pop() || '';
          const slug = filename.replace('.md', '');
          
          blogPosts.push({
            title: (attributes as any).title || '',
            date: (attributes as any).date || '',
            thumbnail: (attributes as any).thumbnail || '',
            author: (attributes as any).author || '',
            summary: (attributes as any).summary || '',
            tags: (attributes as any).tags || [],
            slug,
            content: body
          });
        }

        console.log('Loaded blog posts:', blogPosts);
        setBlogs(blogPosts);
        
        const tags = Array.from(new Set(blogPosts.flatMap(post => post.tags || []))).filter(Boolean);
        setAllTags(['all', ...tags]);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = selectedTag === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.tags?.includes(selectedTag));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-gray-300">
            Insights and updates from the world of Physics and AI
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedTag === tag 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-purple-100'}`}
            >
              {tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <Link 
                to={`/blog/${blog.slug}`} 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    )) || []}
                  </div>
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
