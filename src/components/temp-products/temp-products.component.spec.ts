import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempProductsComponent } from './temp-products.component';

describe('TempProductsComponent', () => {
  let component: TempProductsComponent;
  let fixture: ComponentFixture<TempProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
