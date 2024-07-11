import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,FormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
  constructor(private catService: CategoryService, private snackBar: MatSnackBar){}
  mycategory: Category={};



  addCategory(){

    if(this.mycategory.title =='' || this.mycategory.title ==null){
      // alert("username is required");
      this.snackBar.open("Title is required", 'ok',{
        duration:3000, verticalPosition:'top',
        horizontalPosition:'right'
      })
      return;
    }

    this.catService.addCategory(this.mycategory).subscribe(     
      (data)=>{console.log(data)
        Swal.fire({
          title: "Success Done !!",
          text: "Category Added",
          icon: "success"
        });
        
        this.mycategory.title=''
        this.mycategory.description=''
      },
      error=>{console.log(error)
        Swal.fire('Error !!','Server Error !!','error')
      }
    )
    console.log("added");
  }
}
