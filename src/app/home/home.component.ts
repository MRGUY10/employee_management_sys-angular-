import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';
import { DatePipe, NgForOf } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchQuery: string = '';

  @ViewChild('cardContainer') cardContainer!: ElementRef;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getAllEmployees();
    this.filteredEmployees = this.employees;
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  viewDetails(id: number): void {
    this.employeeService.incrementClickCount(id);
    this.employees = this.employeeService.getAllEmployees();
    this.filteredEmployees = this.employees;
    this.router.navigate(['/details', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
    this.employees = this.employeeService.getAllEmployees();
    this.filteredEmployees = this.employees;
  }

  scrollLeft(): void {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.cardContainer) {
      this.cardContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  onSearchChange(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchQuery) ||
      employee.membershipLevel.toLowerCase().includes(this.searchQuery)
    );
  }
  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);  // Navigate to edit route
  }

}
