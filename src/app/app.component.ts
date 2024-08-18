import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgbNavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Advanced Converter';
}
