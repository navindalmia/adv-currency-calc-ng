import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterWrapperComponent } from './converter-wrapper.component';

describe('ConverterWrapperComponent', () => {
  let component: ConverterWrapperComponent;
  let fixture: ComponentFixture<ConverterWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
