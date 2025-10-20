using Microsoft.AspNetCore.Identity;

namespace Chat_API.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
