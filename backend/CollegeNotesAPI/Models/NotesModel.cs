namespace CollegeNotesAPI.Models
{
    public class NotesModel
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";
        public string Course { get; set; } = "";
        public string Email { get; set; } = "";
        public string FilePath { get; set; } = "";

        public string Semester { get; set; } = ""; // ✅ ADD THIS
    }
}