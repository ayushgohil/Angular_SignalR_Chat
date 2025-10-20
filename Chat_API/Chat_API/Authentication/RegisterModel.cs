using System.ComponentModel.DataAnnotations;

namespace Chat_API.Authentication
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Firsst Name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Phone No. is required")]
        public string PhoneNo { get; set; }
    }
}
