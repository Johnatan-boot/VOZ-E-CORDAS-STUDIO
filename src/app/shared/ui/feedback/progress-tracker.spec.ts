import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppProgressTracker } from './progress-tracker';

describe('AppProgressTracker', () => {
  let component: AppProgressTracker;
  let fixture: ComponentFixture<AppProgressTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProgressTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(AppProgressTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate effectivePercentage based on completed and total modules', () => {
    fixture.componentRef.setInput('completedModules', 3);
    fixture.componentRef.setInput('totalModules', 5);
    fixture.detectChanges();

    expect(component.effectivePercentage()).toBe(60);
    expect(component.computedCompletedModules()).toBe(3);
    expect(component.computedTotalModules()).toBe(5);
  });

  it('should respect direct percentage input if provided', () => {
    fixture.componentRef.setInput('percentage', 85);
    fixture.componentRef.setInput('completedModules', 1);
    fixture.componentRef.setInput('totalModules', 5);
    fixture.detectChanges();

    expect(component.effectivePercentage()).toBe(85);
  });

  it('should calculate dashOffset and circumference accurately', () => {
    fixture.componentRef.setInput('percentage', 50);
    fixture.detectChanges();

    const circumference = component.circumference();
    expect(circumference).toBeGreaterThan(0);
    expect(component.dashOffset()).toBeCloseTo(circumference / 2, 1);
  });

  it('should render SVG circular ring element', () => {
    fixture.componentRef.setInput('completedModules', 2);
    fixture.componentRef.setInput('totalModules', 4);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.querySelectorAll('circle').length).toBe(2);
  });
});
