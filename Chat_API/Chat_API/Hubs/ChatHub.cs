using Microsoft.AspNetCore.SignalR;
using System;
namespace Chat_API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
