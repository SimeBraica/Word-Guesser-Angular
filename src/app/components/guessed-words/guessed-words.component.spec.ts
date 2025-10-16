import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessedWordsComponent } from './guessed-words.component';

describe('GuessedWordsComponent', () => {
  let component: GuessedWordsComponent;
  let fixture: ComponentFixture<GuessedWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessedWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
