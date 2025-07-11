import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet], 
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {}