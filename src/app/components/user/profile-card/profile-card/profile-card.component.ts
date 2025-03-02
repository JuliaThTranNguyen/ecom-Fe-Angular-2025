import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'user-profile-card',
  templateUrl: './profile-card.component.html',
  standalone: false,
})
export class ProfileCardComponent implements OnInit {
  userProfile: UserProfileModel | null = null;
  loading = true;
  errorMessage = '';
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;

        console.log('User profile:', profile);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }

  onEdit() {
    this.isEditing = true;
  }

  onSave(updatedProfile: UserProfileModel) {
    this.userProfile = updatedProfile;
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }
}