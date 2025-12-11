import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-main-module',
  imports: [SidebarComponent, MenuContentComponent],
  templateUrl: './main-module.component.html',
  styleUrl: './main-module.component.css'
})
export class MainModuleComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.stop();
  }
  selectedMenu: any = '';


  onMenuSelected(menu: any) {
    this.selectedMenu = menu;
  }
}
