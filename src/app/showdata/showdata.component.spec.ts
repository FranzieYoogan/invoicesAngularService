import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdataComponent } from './showdata.component';

describe('ShowdataComponent', () => {
  let component: ShowdataComponent;
  let fixture: ComponentFixture<ShowdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
