import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.module';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeModelObj : EmployeeModel = new EmployeeModel() ;
  employeeData ! : any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder : FormBuilder , private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salery : ['']
    })
    this.getAllEmployee();
  }

  postEmployeDetails(){
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salery = this.formValue.value.salery;

    this.api.postEmploye(this.employeModelObj)
      .subscribe((res: any)=>{
         console.log(res);
         //alert("Employee Added Successfully")
         Swal.fire({
          icon: 'success',
          title: 'Employee has been saved successfully',
          showConfirmButton: false,
          timer: 1500
        })
         let ref = document.getElementById('cancel')
         ref?.click();
         this.formValue.reset();
         this.getAllEmployee();
      },
        (      Error: any)=>{
        //alert("Something went Wrong")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })
      }
      )

    this.getAllEmployee();
  }

  //
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getAllEmployee(){
    this.api.getEmploye()
      .subscribe(res=>{
        this.employeeData = res;
      })
  }

  deleteEmployee(row: any){
    this.api.deleteEmploye(row.id)
      .subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: 'Employee Deleted successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllEmployee()
      })
  }

  onEdit(row : any){
    this.employeModelObj.id = row.id;
    this.showAdd = false;
    this.showUpdate = true;

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salery'].setValue(row.salery);
  }

  updateEmployee(){
    console.log("clickedU")
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salery = this.formValue.value.salery;

    this.api.putEmploye(this.employeModelObj,this.employeModelObj.id)
      .subscribe((res : any)=>{
        //alert("Updated sucessfully")
        Swal.fire({
          icon: 'success',
          title: 'Updated successfuly',
          showConfirmButton: false,
          timer: 1500
        })

        let ref = document.getElementById('cancel')
         ref?.click();
         this.formValue.reset();
         this.getAllEmployee();
      })
  }

}
