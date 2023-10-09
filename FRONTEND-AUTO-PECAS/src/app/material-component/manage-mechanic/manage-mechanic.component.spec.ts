import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMechanicComponent } from './manage-mechanic.component';

describe('ManageMechanicComponent', () => {
  let component: ManageMechanicComponent;
  let fixture: ComponentFixture<ManageMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMechanicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
