import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImeiModalComponent } from './delete-imei-modal.component';

describe('DeleteImeiModalComponent', () => {
  let component: DeleteImeiModalComponent;
  let fixture: ComponentFixture<DeleteImeiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteImeiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteImeiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
