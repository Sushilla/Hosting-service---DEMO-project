import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPUInformationModalComponent } from './cpuinformation-modal.component';

describe('CPUInformationModalComponent', () => {
  let component: CPUInformationModalComponent;
  let fixture: ComponentFixture<CPUInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPUInformationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CPUInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
