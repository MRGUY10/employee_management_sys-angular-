import { Injectable } from '@angular/core';
import {Employee} from "./models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private storageKey = 'employees';

  constructor() { }

  getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.storageKey);
    return employees ? JSON.parse(employees) : [];
  }

  private saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  getAllEmployees(): Employee[] {
    return this.getEmployees();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.getEmployees().find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveEmployees(employees);
    }
  }

  deleteEmployee(id: number): void {
    let employees = this.getEmployees();
    employees = employees.filter(emp => emp.id !== id);
    this.saveEmployees(employees);
  }
  incrementClickCount(id: number): void {
    const employees = this.getEmployees();
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      if (employee.clickCount === undefined) {
        employee.clickCount = 0;
      }
      employee.clickCount++;
      this.saveEmployees(employees);  // Save updated employees back to localStorage
    }
  }


}
