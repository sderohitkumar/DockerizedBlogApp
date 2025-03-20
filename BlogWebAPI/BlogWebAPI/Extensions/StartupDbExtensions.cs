using BlogWebAPI.Context;
using Microsoft.EntityFrameworkCore;

namespace BlogWebAPI.Extensions
{
    public static class StartupDbExtensions
    {
        public static  void CreateDbIfNotExists(this IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            var blogContext = services.GetRequiredService<BlogDbContext>();
           
            try
            {
                blogContext.Database.EnsureCreated();
                blogContext.Database.Migrate();
            }
            catch (Exception ex) {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError($"Migration error {ex.Message}");
            }

            DbInitializerSeedData.InitializeDatabase(blogContext);
        }
    }
}
