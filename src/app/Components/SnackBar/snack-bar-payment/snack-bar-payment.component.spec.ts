import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarPaymentComponent } from './snack-bar-payment.component';

describe('SnackBarPaymentComponent', () => {
  let component: SnackBarPaymentComponent;
  let fixture: ComponentFixture<SnackBarPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
