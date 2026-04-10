namespace CollegeNotesAPI.Models
{
    public class UserDashboard
    {
        public UserInfo User { get; set; } = new UserInfo();
        public List<UploadedNote> UploadedNotes { get; set; } = new List<UploadedNote>();
    }

    public class UserInfo
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Mobile { get; set; } = "";
    }

    public class UploadedNote
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Course { get; set; } = "";
        public string FilePath { get; set; } = "";
        public DateTime UploadDate { get; set; }
    }
}
