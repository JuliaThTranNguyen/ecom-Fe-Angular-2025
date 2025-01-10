import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly currentTheme = signal<Theme>('light');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    //Only run the theme service on the browser platform
    if(isPlatformBrowser(this.platformId)){
      this.setTheme(this.getThemeFromLocalStorage());
    }
  }

  toggleTheme() {
    if (this.currentTheme() === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
    
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeInLocalStorage(theme);
    }
  }

  setThemeInLocalStorage(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('preferred-theme', theme);
    }
  }

  getThemeFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('preferred-theme') as Theme ?? 'light';
    }
    return 'light'; // Return 'light' if it's not in the browser
  }

}
