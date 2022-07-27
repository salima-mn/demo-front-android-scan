import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserModelComponent } from './delete-user-model.component';

describe('DeleteUserModelComponent', () => {
  let component: DeleteUserModelComponent;
  let fixture: ComponentFixture<DeleteUserModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
