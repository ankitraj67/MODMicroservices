import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmentorComponent } from './editmentor.component';

describe('EditmentorComponent', () => {
  let component: EditmentorComponent;
  let fixture: ComponentFixture<EditmentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
