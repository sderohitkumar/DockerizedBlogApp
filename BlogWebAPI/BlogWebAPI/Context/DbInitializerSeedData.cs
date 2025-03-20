using BlogWebAPI.Entity;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BlogWebAPI.Context
{
    public static class DbInitializerSeedData
    {
        public static void InitializeDatabase(BlogDbContext context)
        {
            if (context.Blogs.Any())
            {
                return;
            }

            var blogs = new List<Blog>
            {
                new Blog { Title = "Getting Started with React", Author="Rohit", CreatedAt = DateTime.Now, Description="React is a popular JavaScript library for building dynamic user interfaces efficiently. It follows a component-based architecture, allowing developers to break UIs into reusable components. React uses a virtual DOM, improving performance by updating only the changed parts of the UI. State management in React can be handled using useState for local state and Redux or Context API for global state. React applications are often built using React Router for navigation and can fetch data from APIs using fetch() or Axios. With tools like Vite and Create React App (CRA), developers can quickly set up a React project. React also integrates well with TypeScript for better type safety. Understanding JSX (JavaScript XML) is crucial, as it allows writing HTML-like syntax inside JavaScript. The latest features, like hooks and React Server Components, further simplify development, making React an essential skill for modern web developers." },
                new Blog { Title = "Getting Started with Net core", Author="Rohit", CreatedAt = DateTime.Now, Description=".NET Core (now .NET) is a cross-platform, open-source framework for building modern web applications. It allows developers to create RESTful APIs using ASP.NET Core Web API. With built-in dependency injection, middleware, and Entity Framework Core (EF Core) for database interactions, .NET Core ensures scalable and maintainable applications. The framework follows the MVC (Model-View-Controller) pattern, separating business logic from presentation layers. It supports minimal APIs, reducing boilerplate code, and is ideal for microservices architectures. Configuration in .NET Core is flexible, using appsettings.json for managing environment-specific settings. Authentication and authorization are handled seamlessly with JWT (JSON Web Tokens) and Identity. Developers can host .NET Core applications on Windows, Linux, or Docker containers. The built-in Kestrel server improves performance, and tools like Swagger simplify API documentation. Whether you're a beginner or an experienced developer, .NET Core provides powerful features for creating high-performance web applications." },
                new Blog { Title = "Getting Started with Docker", Author="Rohit", CreatedAt = DateTime.Now, Description="Docker is a containerization platform that simplifies application deployment by packaging everything needed (code, dependencies, runtime) into lightweight containers. Unlike traditional virtualization, Docker containers share the host OS kernel, making them more efficient and portable. Using a Dockerfile, developers can define how an application is built and configured. Docker Compose allows running multi-container applications by defining services in a docker-compose.yml file. Containers can be pushed to Docker Hub or private registries for sharing. With Docker, applications can run consistently across different environments, eliminating the \"works on my machine\" problem. It is widely used for microservices architecture, enabling developers to run multiple services independently. Kubernetes (K8s) enhances Docker by providing container orchestration, scaling, and self-healing capabilities. Whether deploying web applications, databases, or background jobs, Docker streamlines the process, making it an essential tool for modern DevOps and cloud-native development." },
            };

            context.Blogs.AddRange(blogs);
            context.SaveChanges();
        }
    }
}
