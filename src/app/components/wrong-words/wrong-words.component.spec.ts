import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongWordsComponent } from './wrong-words.component';

describe('WrongWordsComponent', () => {
  let component: WrongWordsComponent;
  let fixture: ComponentFixture<WrongWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrongWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
