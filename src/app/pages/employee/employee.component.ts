import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService,Employee, CreateEmployeeReq } from '../../services/employee/employee.service';
import{ PositionService,Position } from '../../services/position/position.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeList: any[] = [];
 employeeForm: FormGroup; 
 positions: Position[] = [];
  
 editingId: number | null = null;
 

  constructor(
    private fb: FormBuilder,
    private empSvc: EmployeeService,
    private posSvc: PositionService
  ) {
   
   this.employeeForm = this.fb.group({
  
    employeeId:  [{ value: null, disabled: true }], 
   
     positionId:  [null, Validators.required],
    employeeName:['', Validators.required],
    contactNo:['', Validators.pattern(/^[0-9]{10}$/)],
    emailId:['', Validators.email]
  });
  }
  
  
   ngOnInit(): void {
    
    this.empSvc.getAllEmployees().subscribe({
      next: emps => this.employeeList = emps,
      error: err => console.error('Failed to load employees:', err)
    });
    
    this.posSvc.getAll().subscribe({
      next: pos => this.positions = pos,
      error: err => console.error('Failed to load roles:', err)
    });
  }
  trackByEmployeeId(_: number, emp: Employee) {
    return emp.employeeid;
  }

  onEdit(emp: Employee) {
       this.editingId = emp.employeeid;
       this.employeeForm.setValue({
         employeeId:   emp.employeeid,
         positionId:   emp.positionid,
         employeeName: emp.employeename,
         contactNo:    emp.contactnumber || '',
          emailId:      emp.email || ''
       });
    }
  
     
     onDelete(emp: Employee) {
       if (!confirm(`Delete ${emp.employeename}?`)) return;
       this.empSvc.deleteEmployee(emp.employeeid).subscribe({
         next: () => {
           this.employeeList = this.employeeList.filter(e => e.employeeid !== emp.employeeid);
         },
         error: err => console.error('Delete failed', err)
       });
     }

     onSubmit() {
      if (this.employeeForm.invalid) return;
  
     
      const f = this.employeeForm.value as {
        positionId:   number;
        employeeName: string;
        contactNo:    string;
        emailId:      string;
      };
  
      
      const payload: CreateEmployeeReq = {
        positionid:    f.positionId,
        employeename:  f.employeeName,
        contactnumber: f.contactNo,
        email:         f.emailId
      };
  
      if (this.editingId != null) {
        
        this.empSvc.updateEmployee(this.editingId, payload).subscribe({
          next: updated => {
            const idx = this.employeeList.findIndex(e => e.employeeid === this.editingId);
            this.employeeList[idx] = updated;
            this.resetForm();
          },
          error: err => console.error('Update failed', err)
        });
      } else {
        
        this.empSvc.createEmployee(payload).subscribe({
          next: created => {
            this.employeeList.push(created);
            this.resetForm();
          },
          error: err => console.error('Error creating employee:', err)
        });
      }
    }
  
    private resetForm() {
      this.editingId = null;
      this.employeeForm.reset({ positionId: null });
    }
  onCancel() {
    this.resetForm();
  }

}






















