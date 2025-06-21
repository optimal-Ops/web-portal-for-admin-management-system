
import { Component } from '@angular/core';
import { JobApplicationFormComponent } from '../job-application-form/job-application-form.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-career',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css'
})
export class CareerComponent {

  

  jobs = [
    {
       id: 1,
      title: 'Product Designer',
      department: 'Design',
      description: "We're looking for a mid-level product designer to join our team.",
      remote: true,
      fullTime: true,
    },
    {
       id: 2,
      title: 'Engineering Manager',
      department: 'Development',
      description: "We're looking for an experienced engineering manager to join our team.",
      remote: true,
      fullTime: true,
    },
    {
       id: 3,
      title: 'Customer Success Manager',
      department: 'Customer Service',
      description: "We're looking for a customer success manager to join our team.",
      remote: true,
      fullTime: true,
    },
    {
       id: 4,
      title: 'Frontend Developer',
      department: 'Development',
      description: "We're looking for a skilled frontend developer with React experience.",
      remote: true,
      fullTime: true,
    },
    {
       id: 5,
      title: 'UX Researcher',
      department: 'Design',
      description: "We're looking for a UX researcher to help us understand our users better.",
      remote: true,
      fullTime: true,
    },
  ];

 
  selectedDepartment: string = 'View all';

  showApplicationForm: boolean = false;

  selectedJobTitle: string = '';

  filterJobs(department : string): void{
    this.selectedDepartment=department;
  }

  get filteredJobs(){
    if(this.selectedDepartment === 'View all'){
      return this.jobs;

    }
    return this.jobs.filter((job)=> job.department === this.selectedDepartment);
    
  }

 
  
}
