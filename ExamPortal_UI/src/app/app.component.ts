import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
// import { NgxLoadingModule } from "ngx-loading";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule,MatDividerModule, MatIconModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'examfront';
}
