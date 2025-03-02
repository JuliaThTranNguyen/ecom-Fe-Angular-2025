import { Component, inject, Signal } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle-icon',
  standalone: false,
  
  templateUrl: './theme-toggle-icon.component.html',
  styleUrl: './theme-toggle-icon.component.scss'
})
export class ThemeToggleIconComponent {
  readonly themeService = inject(ThemeService);

  // Track the current theme
  currentTheme: Signal<Theme>;

  constructor() {
    // Initialize the current theme signal
    this.currentTheme = this.themeService.currentTheme;
  }

  toggleTheme() {
    // Call the toggleTheme method from the theme service
    this.themeService.toggleTheme();
  }
}
