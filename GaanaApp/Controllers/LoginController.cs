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
    public class LoginController : ControllerBase
    {
        private readonly GaanaDBContext _context;
        public LoginController(GaanaDBContext context)
        {
            _context = context;
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = _context.Users.AsQueryable();
            return Ok(userdetails);
        }
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.Users.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "User Added Successfully"
                });
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.Users.Where(x =>
                x.Email == userObj.Email
                && x.Password == userObj.Password).FirstOrDefault();
                if(user != null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully",
                        UserData = userObj.Username
                    });
                } else
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        message = "User Not Found"
                    });
                }
            }
        }
    }
}
