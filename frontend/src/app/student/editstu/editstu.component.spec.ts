import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstuComponent } from './editstu.component';

describe('EditstuComponent', () => {
  let component: EditstuComponent;
  let fixture: ComponentFixture<EditstuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
