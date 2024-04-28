import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerResourcesComponent } from './server-resources.component';

describe('ServerResourcesComponent', () => {
  let component: ServerResourcesComponent;
  let fixture: ComponentFixture<ServerResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});