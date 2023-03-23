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
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RTools_NTS.Util;
using System.IdentityModel.Tokens.Jwt;

[assembly: ApiController]
var builder = WebApplication.CreateBuilder(args);
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
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
    options.AddPolicy("corspolicy", build =>
    {
        build.WithOrigins(frontendURL)
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


builder.Services.AddSingleton<GeometryFactory>(NtsGeometryServices
    .Instance.CreateGeometryFactory(srid: 4326));
builder.Services.AddSingleton(provider => new MapperConfiguration(config =>
{
    var geometyFactory = provider.GetRequiredService<GeometryFactory>();
    config.AddProfile(new AutoMapperProfiles(geometyFactory));
}).CreateMapper());
builder.Services.AddScoped<IFileStorageService, InAppStorageService>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors("corspolicy");

app.UseStaticFiles();

app.Run();
