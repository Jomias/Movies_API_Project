using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MoviesAPI;
using MoviesAPI.ApiBehavior;
using MoviesAPI.Filters;

using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Helpers;
using NetTopologySuite.Geometries;
using NetTopologySuite;
using AutoMapper;

[assembly: ApiController]
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(MyExceptionFilter));
    options.Filters.Add(typeof(ParseBadRequest));
}).ConfigureApiBehaviorOptions(BadRequestBehavior.Parse);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    var configuration = builder.Configuration;
    var frontendURL = configuration.GetValue<string>("frontend_url");
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendURL)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders(new string[] { "totalAmountOfRecords " });
    });
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    sqlOptions => sqlOptions.UseNetTopologySuite()));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

builder.Services.AddSingleton<GeometryFactory>(NtsGeometryServices
    .Instance.CreateGeometryFactory(srid: 4326));
builder.Services.AddSingleton(provider => new MapperConfiguration(config =>
{
    var geometyFactory = provider.GetRequiredService<GeometryFactory>();
    config.AddProfile(new AutoMapperProfiles(geometyFactory));
}).CreateMapper());
builder.Services.AddScoped<IFileStorageService, InAppStorageService>();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.UseCors();

app.UseStaticFiles();

app.Run();
