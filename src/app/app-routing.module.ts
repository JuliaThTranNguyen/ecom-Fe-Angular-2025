import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'user-login',
    component: LoginComponent,
  },
  {
    path: 'user-register',
    component: SignupComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'auth/users',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
