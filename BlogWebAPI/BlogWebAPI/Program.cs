using BlogWebAPI.Context;
using BlogWebAPI.Extensions;
using BlogWebAPI.Services;

var environment = Environment.GetEnvironmentVariable("APP_ENV") ?? "production";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddJsonFile(
        $"appsettings.{environment}.json",
        optional: true,
        reloadOnChange: true
     ).AddEnvironmentVariables();

var sqlConnectionString = builder.Configuration.GetConnectionString("BlogDatabase");
var redisConnectionString = builder.Configuration.GetConnectionString("Redis");
builder.Services.AddSqlServer<BlogDbContext>(sqlConnectionString);
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = redisConnectionString;
    options.InstanceName = "BlogCache_";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();
app.CreateDbIfNotExists();
app.Run();