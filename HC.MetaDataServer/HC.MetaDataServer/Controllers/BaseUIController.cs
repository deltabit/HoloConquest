using HC.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace HC.MetaDataServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseUIController : ControllerBase
    {
        public BaseUIController()
        {
        }

        [HttpGet(Name = "RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            Console.WriteLine(user.Addres);
            return Ok(10);
        }
    }
}
