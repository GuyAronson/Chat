using System;

namespace Chat_Server.Hubs.ClientHub
{
	public interface IChatClient
	{
		Task ReceiveMessage(string username, string serverAddress);
	}
}
