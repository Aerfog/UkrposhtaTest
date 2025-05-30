FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Server.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app .

ENV ConnectionStrings__DefaultConnection="Host=db;Database=EmployeeManagement;Username=postgres;Password=YourStrong@Passw0rd"

ENTRYPOINT ["dotnet", "Server.dll"]