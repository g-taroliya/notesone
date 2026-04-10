using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.IO;
using CollegeNotesAPI.Models;

namespace CollegeNotesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NotesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // ====================== UPLOAD NOTES ======================
        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public IActionResult UploadNotes(
            [FromForm] string title,
            [FromForm] string course,
            [FromForm] string email,
            [FromForm] string semester,
            IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("❌ Please select a file!");

            string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            string filePath = Path.Combine(uploadsFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            using (var conn = new MySqlConnection(connStr))
            {
                conn.Open();

                string query = @"INSERT INTO notes 
                (title, filePath, course, email, semester) 
                VALUES (@title, @file, @course, @mail, @sem)";

                using var cmd = new MySqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@title", title);
                cmd.Parameters.AddWithValue("@file", file.FileName);
                cmd.Parameters.AddWithValue("@course", course);
                cmd.Parameters.AddWithValue("@mail", email);
                cmd.Parameters.AddWithValue("@sem", semester);

                cmd.ExecuteNonQuery();
            }

            return Ok("✅ Notes uploaded successfully!");
        }

        // ====================== GET NOTES ======================
        [HttpGet("getnotes")]
        public IActionResult GetNotes(string? course)
        {
            try
            {
                string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";
                using var con = new MySqlConnection(connStr);
                con.Open();

                string query = "SELECT * FROM notes";

                if (!string.IsNullOrEmpty(course))
                    query += " WHERE course = @course";

                using var cmd = new MySqlCommand(query, con);

                if (!string.IsNullOrEmpty(course))
                    cmd.Parameters.AddWithValue("@course", course);

                var reader = cmd.ExecuteReader();

                List<NotesModel> list = new();

                while (reader.Read())
                {
                    list.Add(new NotesModel
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetString("title"),
                        Course = reader.GetString("course"),
                        Email = reader.GetString("email"),
                        FilePath = reader.GetString("filePath"),
                        Semester = reader["semester"] != DBNull.Value 
                            ? reader["semester"].ToString()! 
                            : ""
                    });
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ====================== RECOMMENDED ======================
        [HttpGet("recommended")]
        public IActionResult GetRecommendedNotes()
        {
            try
            {
                string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";
                using var con = new MySqlConnection(connStr);
                con.Open();

                string query = "SELECT * FROM recommended_notes";
                using var cmd = new MySqlCommand(query, con);
                var reader = cmd.ExecuteReader();

                List<RecommendedNote> list = new();

                while (reader.Read())
                {
                    list.Add(new RecommendedNote
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetString("title"),
                        Category = reader.GetString("category"),
                        Semester = reader["semester"] != DBNull.Value 
                            ? reader["semester"].ToString()! 
                            : "",
                        FilePath = reader.GetString("filePath")
                    });
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ====================== MOST SEARCHED ======================
        [HttpGet("most-searched")]
        public IActionResult GetMostSearched()
        {
            try
            {
                string connStr = _configuration.GetConnectionString("DefaultConnection") ?? "";
                using var con = new MySqlConnection(connStr);
                con.Open();

                string query = "SELECT * FROM notes ORDER BY id DESC LIMIT 5";

                using var cmd = new MySqlCommand(query, con);
                var reader = cmd.ExecuteReader();

                List<NotesModel> list = new();

                while (reader.Read())
                {
                    list.Add(new NotesModel
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetString("title"),
                        Course = reader.GetString("course"),
                        Email = reader.GetString("email"),
                        FilePath = reader.GetString("filePath"),
                        Semester = reader["semester"] != DBNull.Value 
                            ? reader["semester"].ToString()! 
                            : ""
                    });
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}