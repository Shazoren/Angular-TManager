import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreateComponent } from './ticket-create.component';

describe('TicketCreateComponent', () => {
  let component: TicketCreateComponent;
  let fixture: ComponentFixture<TicketCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
