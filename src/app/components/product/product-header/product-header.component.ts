import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  standalone: false,
})
export class ProductHeaderComponent implements OnInit {
  @Output() updatedLayout = new EventEmitter<number>();
  @Output() toggleFilter = new EventEmitter<void>();
  @Output() searchQueryChanged = new EventEmitter<string>();

  searchExpanded = false; 
  searchQuery = ''; 
  userIsAdmin: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.checkIfUserIsAdmin();
  }

  // Check if the user has admin privileges
  checkIfUserIsAdmin() {
    this.userIsAdmin = this.userService.isAdmin();
  }

  // Toggle search bar visibility
  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
    if (!this.searchExpanded) {
      this.searchQuery = '';
      this.searchQueryChanged.emit(this.searchQuery);
    }
  }

  // Perform the search operation when the user types
  onSearch() {
    console.log('Searching for Product:', this.searchQuery);
    this.searchQueryChanged.emit(this.searchQuery);
  }

  onUpdatedLayout(selectedLayout: number): void {
    this.updatedLayout.emit(selectedLayout);
  }
}
