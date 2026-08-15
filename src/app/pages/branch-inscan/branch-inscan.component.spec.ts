import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInscanComponent } from './branch-inscan.component';

describe('BranchInscanComponent', () => {
  let component: BranchInscanComponent;
  let fixture: ComponentFixture<BranchInscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchInscanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchInscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
