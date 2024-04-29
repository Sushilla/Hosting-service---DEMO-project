import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSpaceUpgradeComponent } from './storage-space-upgrade.component';

describe('StorageSpaceUpgradeComponent', () => {
  let component: StorageSpaceUpgradeComponent;
  let fixture: ComponentFixture<StorageSpaceUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSpaceUpgradeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageSpaceUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
