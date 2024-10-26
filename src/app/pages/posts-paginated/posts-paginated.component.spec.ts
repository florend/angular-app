import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPaginatedComponent } from './posts-paginated.component';

describe('PostsPaginatedComponent', () => {
  let component: PostsPaginatedComponent;
  let fixture: ComponentFixture<PostsPaginatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsPaginatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
