import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import lottie from 'lottie-web';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('lottieContainer') container!: ElementRef;

  constructor(public loader: LoaderService) { }

  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.container.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/CosmosLoader.json'
    });
  }
}
