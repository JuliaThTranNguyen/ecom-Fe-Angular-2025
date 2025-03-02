import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../../services/auth/auth.service';
import { SignupRequestModel } from '../../../../models/auth.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../success-popup/success-popup/success-popup.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  standalone: false,
})
export class SignupFormComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  responseMessage: string = '';
  loadingSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]], // Minimum 8 chars for testing
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );

    // When password changes, revalidate confirmPassword
    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.signupForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  // Custom validator for password match
  passwordsMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: any } | null {
    const password = formGroup.get('password')?.value;
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!confirmPasswordControl) return null;

    if (!confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmPasswordInvalid: true });
      return { confirmPasswordInvalid: true };
    } else if (password !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null); // Clear errors if they match
      return null;
    }
  }

  // Get err message method when checking if passwords mismatch
  getConfirmPasswordError(): string {
    const confirmPasswordControl = this.signupForm.get('confirmPassword');

    if (!confirmPasswordControl) return '';

    if (confirmPasswordControl.hasError('confirmPasswordInvalid')) {
      return 'Invalid confirm password.';
    }
    if (confirmPasswordControl.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }
    return '';
  }

  onSubmit() {
    this.loadingSuccess = true;
    this.responseMessage = '';

    if (this.signupForm.valid) {
      const { confirmPassword, ...userData } = this.signupForm.value;

      this.authService.registerUser(userData as SignupRequestModel).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);

          setTimeout(() => {
            this.loadingSuccess = false;
            const dialogRef = this.dialog.open(SuccessPopupComponent, {
              data: { message: 'Sign up successful! Redirecting to login...' },
            });

            setTimeout(() => {
              dialogRef.close();
              this.router.navigate(['/user-login']);
            }, 2000);
          }, 2000);
        },
        error: (err) => {
          this.loadingSuccess = false;
          this.responseMessage = err.message;
          console.error('Signup error:', err.message);
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
