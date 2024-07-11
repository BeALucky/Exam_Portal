import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatListModule, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
constructor() {}
private unsubscriber : Subject<void> = new Subject<void>();
ngOnInit(): void {

  }
}
