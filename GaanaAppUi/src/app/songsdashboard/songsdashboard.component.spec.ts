import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsdashboardComponent } from './songsdashboard.component';

describe('SongsdashboardComponent', () => {
  let component: SongsdashboardComponent;
  let fixture: ComponentFixture<SongsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
