import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNavigatorComponent } from './post-navigator.component';

describe('PostNavigatorComponent', () => {
  let component: PostNavigatorComponent;
  let fixture: ComponentFixture<PostNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostNavigatorComponent],
    });
    fixture = TestBed.createComponent(PostNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
