using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GaanaApp.ViewModel
{
    public class SongAddUpdateModel
    {
        public int Id
        {
            get;
            set;
        }
        public int UserId
        {
            get;
            set;
        }
        public int ArtistId
        {
            get;
            set;
        }
        public string Songname
        {
            get;
            set;
        }
        public string Ratings
        {
            get;
            set;
        }
    }
}
