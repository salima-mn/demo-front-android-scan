import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserModelComponent } from './edit-user-model.component';

describe('EditUserModelComponent', () => {
  let component: EditUserModelComponent;
  let fixture: ComponentFixture<EditUserModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
