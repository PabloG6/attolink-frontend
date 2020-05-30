import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseExampleComponent } from './response-example.component';

describe('ResponseExampleComponent', () => {
  let component: ResponseExampleComponent;
  let fixture: ComponentFixture<ResponseExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
