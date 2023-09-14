namespace DynamicTableLearn.Models
{
    public class RequestModel
    {
        public string TableName { get; set; }
        public string Keyword { get; set; }
        public string Sort { get; set; }
        public int Take { get; set; }
        public int Skip { get; set; }
    }
}
