import { Component ,OnInit} from '@angular/core';
 import { RouterLink, RouterOutlet } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}