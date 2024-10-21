
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{




  
  public newEmployee:Employee = {} as Employee;

  public employees:Employee[] = [];
  public employeeService!: EmployeeService;

  constructor(employeeService:EmployeeService){
    this.employeeService = employeeService;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response; // Assign the response to employees array
        console.log(this.employees); // Log employees to the console for debugging
      },
      (error: any) => {
        console.error('Error fetching employees:', error); // Handle any errors here
      }
    );
  }


  public onOpenModal(employee:Employee, mode:string): void
  {
    const container = document.getElementById('main-container');
     const button = document.createElement('button');
     button.type = 'button';
     button.style.display='none';
     button.setAttribute('data-bs-toggle','modal');

     if(mode ==='add')
     {
      button.setAttribute('data-bs-target','#addEmployeeModal');
     }
     else if(mode ==='edit')
      {
       button.setAttribute('data-bs-target','#editEmployeeModal');
      }
      else if(mode ==='delete')
      {
         button.setAttribute('data-bs-target','#deleteEmployeeModal');
      }

      container?.appendChild(button);
      button.click();
  }


  public closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('style', 'display: none');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

  



  onAddEmployee(addForm: NgForm): void {
    if (addForm.valid) {  // Check if the form is valid before sending data
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response) => {
          console.log('Employee added successfully', response);
          // Optionally reset the form after successful submission
          this.employees.push(response);
          addForm.reset();
          this.closeModal('addEmployeeModal');  // Close the modal programmatically
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
    }
  }

}
