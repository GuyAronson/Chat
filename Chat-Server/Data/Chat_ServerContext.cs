using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chat_Server.Models;
/*using Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLoggin;*/

namespace Chat_Server.Data
{
    public class Chat_ServerContext : DbContext
    {
        public Chat_ServerContext (DbContextOptions<Chat_ServerContext> options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Partner> Partner { get; set; }
        public DbSet<Chat> Chat { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<Review> Review { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configures one-to-many relationship
            modelBuilder.Entity<Chat>()
                        .HasOne<User>(chat => chat.User)
                        .WithMany(user => user.Chats)
                        .HasForeignKey(chat => chat.UserID);

            modelBuilder.Entity<Chat>()
                        .HasMany(chat => chat.Messages);
        }
    }
}
