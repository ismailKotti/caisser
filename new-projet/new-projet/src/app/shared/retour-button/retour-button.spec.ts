import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourButton } from './retour-button';

describe('RetourButton', () => {
  let component: RetourButton;
  let fixture: ComponentFixture<RetourButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RetourButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
