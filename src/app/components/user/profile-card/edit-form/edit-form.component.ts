import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileModel } from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'profile-edit-form',
  templateUrl: './edit-form.component.html',
  standalone: false,
})
export class EditFormComponent {

  @Input() userProfile!: UserProfileModel; 
  @Output() saveProfile = new EventEmitter<UserProfileModel>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    if (this.userProfile) {
      this.editForm.patchValue(this.userProfile);
    }
  }

  onSave() {
    if (this.editForm.valid) {
      this.onSubmit();
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const updatedData: Partial<UserProfileModel> = this.editForm.value;

    this.userService.updateProfile(updatedData).subscribe({
      next: (updatedProfile) => {
        this.loading = false;
        this.saveProfile.emit(updatedProfile); // Emit updated data to parent
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Failed to update profile.';
      }
    });
  }
}
