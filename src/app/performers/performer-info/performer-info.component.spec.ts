import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerInfoComponent } from './performer-info.component';

describe('PerformerInfoComponent', () => {
  let component: PerformerInfoComponent;
  let fixture: ComponentFixture<PerformerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
