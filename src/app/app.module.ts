import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

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

  
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(), 
    CartService,
    ThemeService,
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
