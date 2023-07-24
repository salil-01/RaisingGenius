import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { signupForm } from 'src/app/models/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpImg: string = 'assets/signup.jpg';

  formData: signupForm = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  handleSubmit(): void {
    console.log(this.formData);
    if (
      this.formData.email === '' ||
      this.formData.password === '' ||
      this.formData.username === ''
    ) {
      this.toast.info('<p>Please fill all the fields</p>', '', {
        enableHtml: true,
        closeButton: true,
      });
      return;
    }
    this.authService.registerUser(this.formData).subscribe({
      next: (res) => {
        // console.log(res);
        this.toast.success('<p>Signup Successfull</p>', '', {
          enableHtml: true,
          closeButton: true,
        });
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.log(error);
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
          closeButton: true,
        });
      },
    });
  }
}
