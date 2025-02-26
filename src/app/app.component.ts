import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgToastModule} from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  standalone: true, // Required for standalone components
  imports: [RouterOutlet,NgToastModule,], // Import required modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ebankify-front';
}
