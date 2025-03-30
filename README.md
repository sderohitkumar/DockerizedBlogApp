 # Brief overview of the multi-service application
 - Created a blog application which allows user to create, read, update, delete blogs.
 - The application contains 3 initial blogs which are created by seeding the data when application runs for the very first time.
 - The blog application consists of 4 different components -
     - Frontend (React)
     - Backend (.net core web api)
     - SQL database
     - Redis(in-memory database)
  - For SQL, default image for docker hub is chosen : **mcr.microsoft.com/mssql/server:latest**
  - For Redis, default image for docker hub is chosen: **redis:latest**
  - For Backend API and frontend, created custom images and deployed onto my docker hub acccount.
    - Backend : **rohitkumar09/blogapp:blogapi-v1**
    - Frontend : **rohitkumar09/blogapp:blogfrontend-v1**
  - Docker networking is added to create a common network so that different application can communicate with each other.
  - Added support of environment variables to handle different environments.

# To run the application
- The application utilizes docker compose to manage and run all the services at once.
- Firstly, go inside the BlogWebApp\BlogWebAPI folder, create a new .env file, a sample .env.example is already added for reference what all variables are needed.
- Also, define a appsettings.{env}.json, where env is dynamic variable based on which environment you want to run. e.g appsettings.Development.json or appsettings.production.json
- Once env is added , open cmd and enter into wsl and execute the following command along with the env file.
    - docker compose --env-file .env up
- When above command is ran, images are pulled for sql server, redis and custom images for frontend and backend.
- Once images are downloaded, containers are created and application is started.

# Application screenshot
- **Blog Home Page**: ![image](https://github.com/user-attachments/assets/827ea62a-776c-4db4-9a32-a74f342d50aa)
- **Blog Detail Page**: ![image](https://github.com/user-attachments/assets/965f0452-c9a5-4787-86c7-4545f15f81eb)
- **Blog Edit Page**: ![image](https://github.com/user-attachments/assets/27047b1c-e205-4b05-9c4d-7414ee9c0f8e)
- **Blog Create Page**: ![image](https://github.com/user-attachments/assets/8df863cf-253a-4e36-a160-ab6f86af2ecd)
- **Blog Delete**: ![image](https://github.com/user-attachments/assets/c5deee40-800e-4ced-871a-73ee9849f870)



