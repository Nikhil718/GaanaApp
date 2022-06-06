using GaanaApp.Models;
using GaanaApp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GaanaApp.Services
{
    public class SongService : ISongService
    {
        private readonly GaanaDBContext _context;
        public SongService(GaanaDBContext context)
        {
            _context = context;
        }
        //Get all products 
        public IList<Songslist> GetAllSongs()
        {
            return _context.Songslists?.Where(x => (bool)!x.Deleted).ToList();
        }

        //Get Products By id

        public Songslist GetSongById(int sId)
        {
            Songslist song;
            try
            {
                song = _context.Find<Songslist>(sId);
            }
            catch (Exception)
            {
                throw;
            }
            return song;
        }

        //Add Songs

        public ResponseModel SaveSong(Songslist songModel)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                    _context.Add<Songslist>(songModel);
                    model.Messsage = "Song Inserted Successfully";
                
                _context.SaveChanges();
                model.IsSuccess = true;
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Messsage = "Error : " + ex.Message;
            }
            return model;
        }

        //Delete Products
        public ResponseModel DeleteSong(int songId)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                Songslist _temp = GetSongById(songId);
                if (_temp != null)
                {
                    _context.Remove<Songslist>(_temp);
                    _context.SaveChanges();
                    model.IsSuccess = true;
                    model.Messsage = "Song Deleted Successfully";
                }
                else
                {
                    model.IsSuccess = false;
                    model.Messsage = "Song Not Found";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Messsage = "Error : " + ex.Message;
            }
            return model;
        }
    }
}
