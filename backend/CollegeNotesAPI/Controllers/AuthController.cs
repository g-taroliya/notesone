using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using CollegeNotesAPI.Models;

namespace CollegeNotesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // ---------------------- SIGNUP -------------------------
        [HttpPost("signup")]
        public IActionResult Signup(string? name, string? email, string? password, string? mobile)
        {
            string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";

            if (string.IsNullOrWhiteSpace(connStr))
                return BadRequest("❌ Database connection string missing!");

            // ⭐ Required field validation
            if (string.IsNullOrWhiteSpace(name) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(password) ||
                string.IsNullOrWhiteSpace(mobile))
            {
                return BadRequest("❌ All fields (name, email, mobile, password) are required!");
            }

            using var conn = new MySqlConnection(connStr);
            conn.Open();

            // ⭐ Check if user already exists
            string checkQuery = "SELECT COUNT(*) FROM users WHERE email=@em";
            using (var checkCmd = new MySqlCommand(checkQuery, conn))
            {
                checkCmd.Parameters.AddWithValue("@em", email);

                int exists = Convert.ToInt32(checkCmd.ExecuteScalar());
                if (exists > 0)
                {
                    return BadRequest("❌ User already exists with this email!");
                }
            }

            // ⭐ Insert new user
            string query = "INSERT INTO users (name, email, password, mobile) VALUES (@name, @em, @pass, @mob)";
            using var cmd = new MySqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@name", name);
            cmd.Parameters.AddWithValue("@em", email);
            cmd.Parameters.AddWithValue("@pass", password);
            cmd.Parameters.AddWithValue("@mob", mobile);

            try
            {
                cmd.ExecuteNonQuery();
                return Ok("Signup Successful!");
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        // ---------------------- LOGIN --------------------------
        [HttpPost("login")]
        public IActionResult Login(string email, string password)
        {
            string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";

            if (string.IsNullOrWhiteSpace(connStr))
                return BadRequest("❌ Database connection string missing!");

            using var conn = new MySqlConnection(connStr);
            conn.Open();

            string query = "SELECT * FROM users WHERE email=@em AND password=@pass";
            using var cmd = new MySqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@em", email);
            cmd.Parameters.AddWithValue("@pass", password);

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return Ok(new { message = "Login Successful!", email });
            }
            else
            {
                return BadRequest("❌ Invalid email or password.");
            }
        }

        // ---------------------- DASHBOARD API -------------------------
        [HttpGet("dashboard")]
        public IActionResult GetUserDashboard(string email)
        {
            string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";

            if (string.IsNullOrWhiteSpace(connStr))
                return BadRequest("❌ Database connection string missing!");

            var result = new UserDashboard();

            using var conn = new MySqlConnection(connStr);
            conn.Open();

            // ----------- FETCH USER DETAILS -----------
            string userQuery = "SELECT name, email, mobile FROM users WHERE email=@em";
            using (var cmd = new MySqlCommand(userQuery, conn))
            {
                cmd.Parameters.AddWithValue("@em", email);

                using var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    result.User = new UserInfo
                    {
                        Name = reader["name"]?.ToString() ?? "",
                        Email = reader["email"]?.ToString() ?? "",
                        Mobile = reader["mobile"]?.ToString() ?? ""
                    };
                }
                else
                {
                    return BadRequest("❌ User not found!");
                }

                reader.Close();
            }

            // ----------- FETCH USER NOTES -----------
            string notesQuery = "SELECT * FROM notes WHERE uploadedBy=@em";

            using (var cmd2 = new MySqlCommand(notesQuery, conn))
            {
                cmd2.Parameters.AddWithValue("@em", email);

                using var reader2 = cmd2.ExecuteReader();
                while (reader2.Read())
                {
                    result.UploadedNotes.Add(new UploadedNote
                    {
                        Id = Convert.ToInt32(reader2["id"]),
                        Title = reader2["title"]?.ToString() ?? "",
                        Course = reader2["course"]?.ToString() ?? "",
                        FilePath = reader2["filePath"]?.ToString() ?? "",
                        UploadDate = Convert.ToDateTime(reader2["uploadDate"])
                    });
                }
            }

            return Ok(result);
        }
    }
}
