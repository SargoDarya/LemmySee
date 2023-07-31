import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTypeSelectorComponent } from './sort-type-selector.component';

describe('SortTypeSelectorComponent', () => {
  let component: SortTypeSelectorComponent;
  let fixture: ComponentFixture<SortTypeSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortTypeSelectorComponent],
    });
    fixture = TestBed.createComponent(SortTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
