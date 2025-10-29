import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() menuSelected = new EventEmitter<string>();

  selectMenu(menu: string) {
    this.menuSelected.emit(menu);
  }

  userCredential: object = localStorage.getItem("usercredentials") == null ? null : JSON.parse(localStorage.getItem("usercredentials") || "");

  ngOnInit(): void {
    debugger;
    if (this.userCredential == null) {
      debugger;
      console.log("this didnt worked")
      this.router.navigate(['/login'])
    }
  }
  constructor(private router: Router) { }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }




}
