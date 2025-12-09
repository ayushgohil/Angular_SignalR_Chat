import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';

@Component({
  selector: 'app-main-module',
  imports: [SidebarComponent, MenuContentComponent],
  templateUrl: './main-module.component.html',
  styleUrl: './main-module.component.css'
})
export class MainModuleComponent {
  selectedMenu: any = '';

  onMenuSelected(menu: any) {
    this.selectedMenu = menu;
  }
}
