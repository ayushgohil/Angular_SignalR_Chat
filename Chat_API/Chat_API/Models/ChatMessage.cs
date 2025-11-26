namespace Chat_API.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int SenderID { get; set; }
        public string SenderName { get; set; }
        public int ReceiverID{ get; set; }
        public string ReceiverName { get; set; }
        public bool isGroup { get; set; }
        public DateTime EntDt { get; set; }
    }
}
