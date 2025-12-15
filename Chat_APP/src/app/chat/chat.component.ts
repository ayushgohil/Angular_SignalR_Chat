import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../Services/user.service';
import { LottieComponent, AnimationOptions, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { NgxUiLoaderService } from 'ngx-ui-loader';

interface ChatUser {
  id: string;
  fullName: string;
  email: string;
  onlineStatus: boolean;
}

interface ChatMessage {
  text: string;
  fromMe: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  users: ChatUser[] = [];
  filteredUsers: ChatUser[] = [];

  selectedUser: ChatUser | null = null;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  constructor(private http: HttpClient, private userauth: UserService, private auth: AuthServiceService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.loadUsers();
  }

  loadUsers() {

    const token = this.auth.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const params = new HttpParams().set("CurrentUserID", this.auth.getUserID() || "")

    this.http.get<ChatUser[]>("https://localhost:7039/api/Chat/users", { headers, params }).subscribe({
      next: (res) => {
        this.ngxService.stop();
        this.users = res;
        this.filteredUsers = [...res];
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }

  // Sidebar search
  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.fullName.toLowerCase().includes(query)
    );
  }

  // Select user
  selectUser(user: ChatUser) {
    this.selectedUser = user;

    // Dummy messages 
    this.messages = [
      { text: `Hey, I'm ${user.fullName}!`, fromMe: false, timestamp: new Date() },
      { text: 'This is a sample chat message.', fromMe: false, timestamp: new Date() },
      { text: 'Hello!', fromMe: true, timestamp: new Date() }
    ];
  }

  // Send message
  sendMessage() {

    if (!this.newMessage.trim() || !this.selectedUser) return;


    this.messages.push({
      text: this.newMessage.trim(),
      fromMe: true,
      timestamp: new Date()
    });

    this.newMessage = '';

    setTimeout(() => {
      const msgArea = document.querySelector('.messages-area');
      msgArea?.scrollTo({ top: msgArea.scrollHeight, behavior: 'smooth' });
    }, 50);
  }
}
