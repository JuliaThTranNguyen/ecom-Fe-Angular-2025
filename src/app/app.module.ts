import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/app_header/header.component';
import { ThemeToggleIconComponent } from './components/theme-toggle-icon/theme-toggle-icon.component';
import { ProductComponent } from './pages/product/product.component';
import { FooterComponent } from './layout/app_footer/footer/footer.component';
import { ProductHeaderComponent } from './components/product/product-header/product-header.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { FiltersComponent } from './components/product/filters/filters.component';
import { CartService } from './services/cart/cart.service';
import { ThemeService } from './services/theme/theme.service';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeToggleIconComponent,
    FooterComponent,
    ProductComponent,
    ProductHeaderComponent,
    ProductCardComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
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

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(), 
    CartService,
    ThemeService,
    ProductService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
