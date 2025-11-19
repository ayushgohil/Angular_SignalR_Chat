import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-menu-content',
  imports: [DashboardComponent],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.css'
})
export class MenuContentComponent implements OnChanges {
  @Input() selectedMenu!: string;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedMenu']) {
      this.loadSelectedComponent();
    }
  }

  loadSelectedComponent() {
    this.container.clear();
    debugger;
    switch (this.selectedMenu) {
      case 'dashboard':
        this.container.createComponent(DashboardComponent);
        break;
      case 'chat':
        this.container.createComponent(ChatComponent);
        break;
      default:
        // Optionally load a default component or placeholder
        break;
    }
  }
}
