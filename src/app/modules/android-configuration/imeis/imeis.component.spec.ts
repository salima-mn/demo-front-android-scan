import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImeisComponent } from './imeis.component';

describe('ImeisComponent', () => {
  let component: ImeisComponent;
  let fixture: ComponentFixture<ImeisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImeisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
