import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from "../models/employee";
import { EmployeeService } from "../employee.service";
import { FormsModule } from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  employee: Employee = {
    name: '',
    id: 0, // ID will be generated in the background
    membershipLevel: 'Bronze', // Default membership level
    date: new Date(),
    profilePhoto: ''
  };
  profileImage: string | ArrayBuffer | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.generateId(); // Generate the ID when initializing
  }

  // Auto-generate ID based on existing employees
  generateId(): void {
    const highestId = this.employeeService.getEmployees().length > 0
        ? Math.max(...this.employeeService.getEmployees().map(emp => emp.id))
        : 0;
    this.employee.id = highestId + 1; // Increment highest ID by 1
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.employee.profilePhoto = this.profileImage as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee);
    this.router.navigate(['/']); // Navigate back to employee list after creation
  }
  cancel(): void {
    this.router.navigate(['/']);
  }
}
