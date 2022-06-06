using System;
using System.Collections.Generic;

#nullable disable

namespace GaanaApp.Models
{
    public partial class User
    {
        public User()
        {
            Songslists = new HashSet<Songslist>();
        }

        public int Userid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? Deleted { get; set; }

        public virtual ICollection<Songslist> Songslists { get; set; }
    }
}
