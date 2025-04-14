FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Create a non-root user and group
#RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BlogWebAPI/BlogWebAPI.csproj", "BlogWebAPI/"]
RUN dotnet restore "./BlogWebAPI/BlogWebAPI.csproj"
COPY . .
WORKDIR "/src/BlogWebAPI"
RUN dotnet build "./BlogWebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BlogWebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
COPY *.json /app/publish/

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .


# Optional: set permissions if app needs to write
# RUN chown -R appuser:appgroup /app
#USER appuser

ENTRYPOINT ["dotnet", "BlogWebAPI.dll"]