import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/app_header/header.component';
import { ThemeToggleIconComponent } from './components/theme-toggle-icon/theme-toggle-icon.component';
import { FooterComponent } from './layout/app_footer/footer.component';
import { ProductHeaderComponent } from './components/product/product-header/product-header.component';
import { ProductComponent } from './pages/product/product.component';
import { FilterComponent } from './components/product/filter/filter.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';

import { CartService } from './services/cart/cart.service';
import { ThemeService } from './services/theme/theme.service';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormComponent } from './components/auth/login/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { SuccessPopupComponent } from './components/auth/success-popup/success-popup/success-popup.component';
import { LogoutButtonComponent } from './components/auth/logout-button/logout-button.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProfileCardComponent } from './components/user/profile-card/profile-card/profile-card.component';
import { EditFormComponent } from './components/user/profile-card/edit-form/edit-form.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ConfirmDeleteComponent } from './components/user/confirm-delete/confirm-delete.component';
import { EditDeleteDialogComponent } from './components/auth/admin/edit-delete-dialog/edit-delete-dialog.component';
import { EditProductFormComponent } from './components/product/product-card/edit-product-form/edit-product-form.component';
import { AddDialogComponent } from './components/auth/admin/add-dialog/add-dialog.component';
import { CreateProductFormComponent } from './components/product/product-card/create-product-form/create-product-form.component';
import { CreateCategoryDialogComponent } from './components/category/create-category-dialog/create-category-dialog.component';
import { CategoryDropdownComponent } from './components/category/category-dropdown/category-dropdown.component';
import { ConfirmDeleteProductComponent } from './components/product/product-card/confirm-delete-product/confirm-delete-product.component';
import { ConfirmDeleteTwiceComponent } from './components/product/product-card/confirm-delete-twice/confirm-delete-twice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeToggleIconComponent,
    FooterComponent,
    ProductHeaderComponent,
    ProductComponent,
    FilterComponent,
    ProductCardComponent,
    CartComponent,
    ProductDetailsComponent,
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent,
    SuccessPopupComponent,
    LogoutButtonComponent,
    UserProfileComponent,
    ProfileCardComponent,
    EditFormComponent,
    UserManagementComponent,
    ConfirmDeleteComponent,
    EditDeleteDialogComponent,
    EditProductFormComponent,
    AddDialogComponent,
    CreateProductFormComponent,
    CreateCategoryDialogComponent,
    CategoryDropdownComponent,
    ConfirmDeleteProductComponent,
    ConfirmDeleteTwiceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    CartService,
    ThemeService,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
