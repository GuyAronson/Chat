namespace Chat_Server.Models
{
    public class Utils
    {
        public static string GenerateRandomnID()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            const int IDlength = 8;
            string id = string.Empty;
            Random rnd = new Random();

            for (int i = 0; i < IDlength; i++)
            {
                int index = rnd.Next(0, chars.Length);
                id += chars[index];
            }

            return id;
        }
    }
}
