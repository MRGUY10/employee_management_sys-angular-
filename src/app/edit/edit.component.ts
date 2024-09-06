import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  employee: Employee = {
    id: 0,
    name: '',
    membershipLevel: 'Bronze',
    date: new Date(),
    profilePhoto: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const emp = this.employeeService.getEmployeeById(id);
    if (emp) {
      this.employee = emp;
    } else {
      this.router.navigate(['/']); // Redirect if employee not found
    }
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.employee);
    this.router.navigate(['/']); // Navigate back to employee list after update
  }

  cancel(): void {
    this.router.navigate(['/']); // Navigate back to employee list
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.employee.profilePhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
