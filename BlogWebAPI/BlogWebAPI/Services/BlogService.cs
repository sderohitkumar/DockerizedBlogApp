using BlogWebAPI.Context;
using BlogWebAPI.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using static System.Reflection.Metadata.BlobBuilder;

namespace BlogWebAPI.Services
{
    public class BlogService : IBlogService
    {
        private readonly BlogDbContext _blogDbContext;
        private readonly IDistributedCache _cache;

        public BlogService(BlogDbContext blogDbContext, IDistributedCache cache)
        {
            _blogDbContext = blogDbContext;
            _cache = cache;
        }

        public async Task<List<Blog>> GetAllAsync()
        {
            const string cacheKey = "all_blogs";

            var cachedBlogs = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedBlogs))
            {
                return JsonConvert.DeserializeObject<List<Blog>>(cachedBlogs)!;
            }

            // If not found in cache, fetch from database
            var blogs = await _blogDbContext.Blogs.ToListAsync();

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            };

            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(blogs), cacheOptions);
            return blogs;
        }

        public async Task<Blog?> GetByIdAsync(int id)
        {
            string cacheKey = $"blog_{id}";

            var cachedBlog = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedBlog))
            {
                return JsonConvert.DeserializeObject<Blog>(cachedBlog);
            }

            var blog = await _blogDbContext.Blogs.FirstOrDefaultAsync(x => x.Id == id);
            if (blog == null) 
                return null;

            await _cache.SetStringAsync(cacheKey, JsonConvert.SerializeObject(blog), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            });

            return blog;
        }

        public async Task<Blog> CreateAsync(Blog blog)
        {
            await _blogDbContext.AddAsync(blog);
            await _blogDbContext.SaveChangesAsync();
            await _cache.RemoveAsync("all_blogs");
            return blog;
        }

        public async Task<int> DeleteAsync(int id)
        {
            var blog = await _blogDbContext.Blogs.FirstOrDefaultAsync(x => x.Id == id);
            if (blog != null) { 
                _blogDbContext.Blogs.Remove(blog);
                await _blogDbContext.SaveChangesAsync();
                await _cache.RemoveAsync("all_blogs");
                await _cache.RemoveAsync($"blog_{id}");
            }

            return id;
        }

        public async Task<int> UpdateAsync(int id, Blog blog)
        {
            var existingBlog = await _blogDbContext.Blogs.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBlog != null) {
                existingBlog.Title = blog.Title;
                existingBlog.Description = blog.Description;
                existingBlog.Author = blog.Author;

                await _blogDbContext.SaveChangesAsync();
                await _cache.RemoveAsync("all_blogs");
                await _cache.RemoveAsync($"blog_{id}");
            }

            return id;
        }
    }
}
