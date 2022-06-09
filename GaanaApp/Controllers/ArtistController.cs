using GaanaApp.Models;
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
    public class ArtistController : ControllerBase
    {
        private readonly GaanaDBContext _context;
        public ArtistController(GaanaDBContext context)
        {
            _context = context;
        }
        [HttpPost("add_artist")]
        public IActionResult Addartist([FromBody] Artist artistObj)
        {
            if (artistObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Artists.Add(artistObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Artist added Successfully"
                });
            }
        }
        [HttpPut("update_artist")]
        public IActionResult UpdateArtist([FromBody] Artist artistObj)
        {
            if (artistObj == null)
            {
                return BadRequest();
            }
            var artist = _context.Artists.AsNoTracking().FirstOrDefault(x => x.Artistid == artistObj.Artistid);
            if (artist == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Entry(artistObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Artist Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_artist/{id}")]
        public IActionResult DeleteArtist(int id)
        {
            var artist = _context.Artists.Find(id);
            if (artist == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(artist);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Artist removed successfully"
                });
            }
        }
        [HttpGet("get_all_artist")]
        public IActionResult GetAllArtist()
        {
            var artist = _context.Artists.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                ArtistDetails = artist
            });
        }
    }
}

