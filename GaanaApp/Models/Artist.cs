using System;
using System.Collections.Generic;

#nullable disable

namespace GaanaApp.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Songslists = new HashSet<Songslist>();
        }

        public int Artistid { get; set; }
        public string Artistname { get; set; }
        public string Dob { get; set; }
        public string Bio { get; set; }
        public bool? Deleted { get; set; }

        public virtual ICollection<Songslist> Songslists { get; set; }
    }
}
