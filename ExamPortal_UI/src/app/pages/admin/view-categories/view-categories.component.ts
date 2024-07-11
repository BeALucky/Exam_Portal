import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,MatDividerModule,MatButtonModule, RouterLink],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
    
  }

  categories:any = []

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
      this.categoryService.Categories().subscribe(
        (data)=>{this.categories = data},
        (error)=>{console.log("ERROR IN GETING CATEGORIES "+error)
          Swal.fire('Error', 'Error in Loading data','error')
        }
      )
  }

}
