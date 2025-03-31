using BlogWebAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace BlogWebAPI.Context
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options):base(options)
        {
            
        }

        public DbSet<Blog> Blogs { get; set; }

    }
}
