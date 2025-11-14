import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() menuSelected = new EventEmitter<string>();
  constructor(private router: Router, private serice: AuthServiceService) { }
  ShortUserName: string = "";
  UserName: string = "";
  Email: string = "";

  selectMenu(menu: string) {
    this.menuSelected.emit(menu);
  }

  userCredential: any = localStorage.getItem("usercredentials") == null ? null : JSON.parse(localStorage.getItem("usercredentials") || "");

  ngOnInit(): void {
    debugger;
    if (this.userCredential == null) {
      debugger;
      console.log("this didnt worked")
      this.router.navigate(['/login'])
    }
    //first showing dashboard on load
    this.menuSelected.emit("dashboard");

    this.UserName = this.userCredential.firstName + this.userCredential.lastName;
    this.Email = this.userCredential.email;
    this.ShortUserName = this.userCredential.firstName[0] + this.userCredential.lastName[0];




  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }




}
