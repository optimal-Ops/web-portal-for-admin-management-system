import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ProjectService,Project,CreateProjectReq } from '../../services/project/project.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
    projectList: any[] = []
    projectForm: FormGroup = new FormGroup({ 
    projectName: new FormControl<string>('', Validators.required),
    managedBy:   new FormControl<number | null>(null),
    startDate:   new FormControl<string>('', Validators.required)

  });
  editingProjectId: number | null = null;

  constructor(private projectSvc: ProjectService) {}
  ngOnInit(): void {
    this.projectSvc.getAllProjects().subscribe({
      next: projects => this.projectList = projects,
      error: err     => console.error('Failed to load projects', err)
    });
  }
  onEdit(project: Project) {
    this.editingProjectId = project.projectid;               
    this.projectForm.patchValue({
      projectName: project.projectname,
      managedBy:   project.managedby ?? null,
      startDate:   project.startdate
    });
  }
  
  
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectSvc.deleteProject(id).subscribe({
        next: () => {
          this.projectList = this.projectList.filter(p => p.id !== id); 
        },
        error: err => console.error('Error deleting project', err)
      });
    }
  }
  
  
  
  onSubmit() {
    if (this.projectForm.invalid) return;
  
    const f = this.projectForm.value;
    const payload: CreateProjectReq = {
      projectName: f.projectName!,
      managedBy:   f.managedBy || undefined,
      startDate:   f.startDate!
    };
  
    if (this.editingProjectId) {
  
      this.projectSvc.updateProject(this.editingProjectId, payload).subscribe({
        next: updated => {
          const idx = this.projectList.findIndex(p => p.id === this.editingProjectId);
          if (idx > -1) this.projectList[idx] = updated;
          this.projectForm.reset();
          this.editingProjectId = null;
        },
        error: err => console.error('Error updating project', err)
      });
    } else {
      this.projectSvc.createProject(payload).subscribe({
        next: created => {
          this.projectList.push(created);
          this.projectForm.reset();
        },
        error: err => console.error('Error creating project', err)
      });
    }
  }
  
  onReset() {
    this.projectForm.reset();
  }
}
