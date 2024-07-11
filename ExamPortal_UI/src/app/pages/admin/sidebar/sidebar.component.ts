import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
