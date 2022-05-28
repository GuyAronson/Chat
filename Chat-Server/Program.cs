using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Chat_Server.Data;
using Chat_Server.Services;
using Chat_Server.Hubs;

//using Chat_Server.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<Chat_ServerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Chat_ServerContext") ?? throw new InvalidOperationException("Connection string 'Chat_ServerContext' not found.")));


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<ReviewService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ChatService>();
builder.Services.AddControllersWithViews();

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error"); 
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
/*app.UseSession();*/
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Reviews}/{action=Index}/{id?}");


app.Run();
