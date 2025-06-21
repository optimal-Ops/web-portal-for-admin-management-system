import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any={
   username: '',
   password: ''
  }
 
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}
  
onLogin() {
  this.loginService.loginUser(this.loginObj).subscribe({
    next: (res) => {
      
      localStorage.setItem('authToken', res.token);
      
      this.router.navigateByUrl('/dashboard');
    },
    error: (err) => {
      alert('Login failed: ' + err.error?.message);
    }
  });
}

  
  }
   
    
    
   

