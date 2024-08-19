import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersListComponent } from './performers-list.component';

describe('PerformersListComponent', () => {
  let component: PerformersListComponent;
  let fixture: ComponentFixture<PerformersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
