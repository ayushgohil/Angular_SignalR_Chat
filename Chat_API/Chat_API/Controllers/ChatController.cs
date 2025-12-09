using Chat_API.Authentication;
using Chat_API.Hubs;
using Chat_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.Linq;

namespace Chat_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IHubContext<ChatHub> _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatController(ApplicationDbContext appDbContext,  IHubContext<ChatHub> hubContext, UserManager<ApplicationUser> userManager)
        {
            _appDbContext = appDbContext;
            _context = hubContext;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<ChatMessage>> Create(ChatMessage chatMessage)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == chatMessage.SenderName);
            var msg = new ChatMessage()
            {
                Message = chatMessage.Message,
                SenderID = chatMessage.SenderID,
                SenderName = chatMessage.SenderName,
                ReceiverID = chatMessage.ReceiverID,
                ReceiverName = chatMessage.ReceiverName,
                isGroup = chatMessage.isGroup,
                EntDt = chatMessage.EntDt
            };
            return msg;
        }
        [HttpGet("users")]
        public async Task<ActionResult<List<ChatUsersDTO>>> GetAllChatUsers()
        {
            var dbUsers = await _userManager.Users.ToListAsync();
            var users = dbUsers.Select(u => new ChatUsersDTO
            {
                Id = u.Id,
                FullName = $"{u.FirstName} {u.LastName}",
                Email = u.Email,
                AvatarURL = ""
            }).ToList();

            return Ok(users);
        }
    }
}
