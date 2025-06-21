import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobApplicationService,Applicant } from '../../services/jobApplication/job-application.service';

@Component({
  selector: 'app-job-application-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
})
export class JobApplicationFormComponent implements OnInit {
  jobApplicationForm: FormGroup;
  jobId: number | null = null;

  private readonly urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobApplicationService
  ) {
    this.jobApplicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      resume: ['', [
        Validators.required,
        Validators.pattern(this.urlPattern)
      ]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.jobId = id ? Number(id) : null;
    });
  }

 onSubmit(): void {
     if (this.jobApplicationForm.valid && this.jobId) {
       const form = this.jobApplicationForm.value;
      const applicationData = {
        jobId: this.jobId,
        ...form
      };

      console.log('Application Submitted:', applicationData);
      alert('Application Submitted Successfully!');
      this.router.navigate(['/careers']);
      const applicant: Applicant = {
        positionId: this.jobId,
        name: form.name,
        email: form.email,
        contactNumber: form.phone,
        resume: form.resume,
      };
      this.jobService.apply(applicant).subscribe({
        next: () => {
        alert('Application Submitted Successfully!');
          this.router.navigate(['/career']);
        },
        error: (err) => {
          console.error(err);
          alert('Submission failed: ' + err.error?.message);
        }
      });
     } else {
       this.markFormGroupTouched(this.jobApplicationForm);
       alert('Please fill all required fields correctly.');
     }
    }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}