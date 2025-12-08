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
            // 1. Get the users from Identity (you MUST await here)
            var dbUsers = await _userManager.Users.ToListAsync();

            // 2. Now you can apply Select because dbUsers is a List<ApplicationUser>
            var users = dbUsers.Select(u => new ChatUsersDTO
            {
                Id = u.Id,
                FullName = $"{u.FirstName} {u.LastName}",
                Email = u.Email,
                AvatarURL = GetDefaultAvatar(u.FirstName, u.LastName)
            }).ToList();

            // 3. Return DTO list
            return Ok(users);
        }

        private string GetDefaultAvatar(string first, string last)
        {
            var initials = $"{first?.FirstOrDefault()}{last?.FirstOrDefault()}".ToUpper();
            return $"https://ui-avatars.com/api/?name={initials}&background=random";
        }

    }
}
