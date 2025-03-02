import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleIconComponent } from './theme-toggle-icon.component';

describe('ThemeToggleIconComponent', () => {
  let component: ThemeToggleIconComponent;
  let fixture: ComponentFixture<ThemeToggleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeToggleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeToggleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
