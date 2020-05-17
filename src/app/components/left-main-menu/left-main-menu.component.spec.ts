import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMainMenuComponent } from './left-main-menu.component';

describe('LeftMainMenuComponent', () => {
  let component: LeftMainMenuComponent;
  let fixture: ComponentFixture<LeftMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
