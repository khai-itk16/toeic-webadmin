import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensorPostsComponent } from './censor-posts.component';

describe('CensorPostsComponent', () => {
  let component: CensorPostsComponent;
  let fixture: ComponentFixture<CensorPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensorPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
