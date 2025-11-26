using AutoMapper;
using Chat_API.Authentication;
using Chat_API.Hubs;
using Chat_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.SignalR;

namespace Chat_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IMapper _mapper;

        public ChatController(ApplicationDbContext appDbContext,  IHubContext<ChatHub> hubContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        [HttpPost]
        
    }
}
