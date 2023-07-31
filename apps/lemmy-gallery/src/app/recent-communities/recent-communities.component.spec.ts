import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCommunitiesComponent } from './recent-communities.component';

describe('RecentCommunitiesComponent', () => {
  let component: RecentCommunitiesComponent;
  let fixture: ComponentFixture<RecentCommunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecentCommunitiesComponent],
    });
    fixture = TestBed.createComponent(RecentCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
