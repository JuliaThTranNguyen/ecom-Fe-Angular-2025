import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoginRequestModel } from '../../../../models/auth.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../success-popup/success-popup/success-popup.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: false,
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword = true;
  responseMessage: string = '';
  loadingSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loadingSuccess = true;
      this.responseMessage = '';

      const loginData: LoginRequestModel = this.loginForm.value;

      this.authService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('accessToken', response.accessToken);

          setTimeout(() => {
            this.loadingSuccess = false;
            this.dialog.open(SuccessPopupComponent, {
              data: { message: 'You are now logged in. Redirecting...' },
            });

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          }, 2000);
        },
        error: (err) => {
          this.loadingSuccess = false;
          this.responseMessage = err.message;
          console.error('Login error:', err.message);
        },
      });
    } else {
      this.responseMessage = 'Please fill in all fields correctly.';
    }
  }
}
