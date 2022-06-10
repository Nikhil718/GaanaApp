using System;
using System.Collections.Generic;

#nullable disable

namespace GaanaApp.Models
{
    public partial class Songslist
    {
        public int Songid { get; set; }
        public string Songname { get; set; }
        public string Image { get; set; }
        public string Ratings { get; set; }
        public int Artistid { get; set; }

        public int Userid { get; set; }
        public bool? Deleted { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual User User { get; set; }
    }
}
