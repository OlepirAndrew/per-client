import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersComponent } from './performers.component';

describe('PerformersComponent', () => {
  let component: PerformersComponent;
  let fixture: ComponentFixture<PerformersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
