using GaanaApp.Models;
using GaanaApp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GaanaApp.Services
{
    public interface ISongService
    {
        IList<Songslist> GetAllSongs();
        Songslist GetSongById(int sId);
        ResponseModel SaveSong(Songslist SongModel);
        ResponseModel DeleteSong(int songId);


    }
}
