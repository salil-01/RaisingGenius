import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { loginForm } from 'src/app/models/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinImg: string = 'assets/signin.jpg';
  formData: loginForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private toast: ToastrService) {}

  handleSubmit(): void {
    console.log(this.formData);
    if (this.formData.email === '' || this.formData.password === '') {
      this.toast.info('<p>Please fill all the fields</p>', '', {
        enableHtml: true,
        closeButton: true,
      });
      return;
    }
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        // console.log(res);
        this.authService.updateLoginCredential(
          res.username,
          res.token,
          res.role
        );
        this.toast.success('<p>Login Successfull</p>', '', {
          enableHtml: true,
          closeButton: true,
        });
        this.formData.email = '';
        this.formData.password = '';
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
