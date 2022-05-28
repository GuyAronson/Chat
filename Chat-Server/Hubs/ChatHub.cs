using Chat_Server.Hubs.ClientHub;
using Chat_Server.Models;
using Chat_Server.Services;
using Microsoft.AspNetCore.SignalR;

namespace Chat_Server.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
    }
}