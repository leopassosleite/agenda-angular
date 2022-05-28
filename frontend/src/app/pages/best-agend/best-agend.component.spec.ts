import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAgendComponent } from './best-agend.component';

describe('BestAgendComponent', () => {
  let component: BestAgendComponent;
  let fixture: ComponentFixture<BestAgendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestAgendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAgendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
