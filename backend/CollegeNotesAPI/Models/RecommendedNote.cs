namespace CollegeNotesAPI.Models
{
    public class RecommendedNote
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? Semester { get; set; }
        public string? FilePath { get; set; }
    }
}
