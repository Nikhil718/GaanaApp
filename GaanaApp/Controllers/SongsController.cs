using GaanaApp.Models;
using GaanaApp.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GaanaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly GaanaDBContext _context;
        public SongsController(GaanaDBContext context)
        {
            _context = context;
        }
        [HttpPost("add_song")]
        public IActionResult AddSong([FromBody] SongAddUpdateModel songObj)
        {
            if(songObj == null)
            {
                return BadRequest();
            }
            else
            {
                var song = new Songslist { Songname = songObj.Songname, Userid = songObj.UserId, Artistid = songObj.ArtistId, Ratings = songObj.Ratings };
                _context.Songslists.Add(song);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Song added Successfully"
                });
            }
        }
        [HttpPut("update_song")]
        public IActionResult UpdateSong([FromBody] SongAddUpdateModel songObj)
        {
            if(songObj == null)
            {
                return BadRequest();
            }
            var song = _context.Songslists.AsNoTracking().FirstOrDefault(x => x.Songid == songObj.Id);
            if(song == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }else
            {
                song.Songname = songObj.Songname;
                song.Userid = songObj.UserId;
                song.Artistid = songObj.ArtistId;
                song.Ratings = songObj.Ratings;
                _context.Entry(song).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Song Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_song/{id}")]
        public IActionResult DeleteSong(int id)
        {
            var song = _context.Songslists.Find(id);
            if(song == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(song);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Song removed successfully"
                });
            }
        }
        [HttpGet("get_all_songs")]
        public IActionResult GetAllSongs()
        {
            var song = _context.Songslists.Include(x=> x.Artist).AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                SongsDetails = song
            });
        }
    }
}
