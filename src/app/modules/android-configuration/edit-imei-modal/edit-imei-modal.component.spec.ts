import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImeiModalComponent } from './edit-imei-modal.component';

describe('EditImeiModalComponent', () => {
  let component: EditImeiModalComponent;
  let fixture: ComponentFixture<EditImeiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImeiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImeiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
