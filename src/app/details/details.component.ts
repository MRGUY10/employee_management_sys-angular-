import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Employee} from "../models/employee";
import {EmployeeService} from "../employee.service";
import {DatePipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  employee?: Employee;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeeService.getEmployeeById(id);
  }

  updateEmployee(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee);
      this.router.navigate(['/']);
    }
  }

  deleteEmployee(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee.id);
      this.router.navigate(['/']);
    }
  }
}
