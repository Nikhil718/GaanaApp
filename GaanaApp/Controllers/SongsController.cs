using GaanaApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult AddSong([FromBody] Songslist songObj)
        {
            if(songObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Songslists.Add(songObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Song added Successfully"
                });
            }
        }
    }
}
