using GaanaApp.Models;
using GaanaApp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GaanaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly ISongService _songService;
        public SongsController(ISongService songService)
        {
            _songService = songService;
        }
        // GET: api/<SongsController>
        [HttpGet]
        public IEnumerable<Songslist> Get()
        {
            return _songService.GetAllSongs();
        }

        //// GET api/<SongsController>/5
        [HttpGet]
        [Route("[action]/id")]
        public IActionResult GetSongById(int id)
        {
            try
            {
                var songs = _songService.GetSongById(id);
                if (songs == null) return NotFound();
                return Ok(songs);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST api/<SongsController>
        [HttpPost]
        [Route("[action]")]
        public IActionResult SaveSong(Songslist songModel)
        {
            try
            {
                var model = _songService.SaveSong(songModel);
                return Ok(model);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }



        //// DELETE api/<SongsController>/5
        [HttpDelete]
        [Route("[action]")]
        public IActionResult DeleteSong(int id)
        {
            try
            {
                var model = _songService.DeleteSong(id);
                return Ok(model);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
