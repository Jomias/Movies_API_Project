namespace MoviesAPI.DTOs
{
    public class PaginationDTO
    {
        public int Page { get; set; } = 1;
        private int recorsPerPage = 10;
        private readonly int maxRecordsPerPage = 50;

        public int RecordsPerPage
        {
            get { return recorsPerPage; }
            set { recorsPerPage = Math.Min(maxRecordsPerPage, value); }
        }
    }
}
