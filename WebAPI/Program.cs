using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Chat_Server.Services;
using Chat_Server.Data;
using Chat_Server.Hubs;
using Chat_Server.Hubs.ClientHub;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Chat_ServerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Chat_ServerContext") ?? throw new InvalidOperationException("Connection string 'Chat_ServerContext' not found.")));


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<ReviewService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

/*builder.Services.AddSession(options =>
{
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = false;
    options.Cookie.SameSite = SameSiteMode.None;
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});*/

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin());

    options.AddPolicy("cors_policy",
    builder =>
    {
        builder.WithOrigins("http://localhost:3002").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });

    options.AddPolicy("ClientPermission", policy =>
    {
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000")
            .WithOrigins("http://localhost:3001")
            .AllowCredentials();
    });
});


/*builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddCookie(options =>
{
    options.LoginPath = "/api/login/";
});*/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/*app.UseCookiePolicy(
         new CookiePolicyOptions
         {
             Secure = CookieSecurePolicy.Always
         });*/
/*app.UseSession();*/

app.UseCors("Allow All");
app.UseCors("ClientPermission");
app.UseCors("cors_policy");
app.UseHttpsRedirection();

app.UseRouting();
//app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseWebSockets();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/Hubs/ChatHub");
});

app.Run();
