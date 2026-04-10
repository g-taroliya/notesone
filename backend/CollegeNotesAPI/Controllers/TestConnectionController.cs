using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace CollegeNotesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestConnectionController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestConnectionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult TestConnection()
        {
            string? connStr = _configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(connStr))
            {
                return BadRequest("❌ Connection string not found in configuration!");
            }

            try
            {
                using (var conn = new MySqlConnection(connStr))
                {
                    conn.Open();
                    return Ok("✅ Database connected successfully!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("❌ Connection failed: " + ex.Message);
            }
        }
    }
}
