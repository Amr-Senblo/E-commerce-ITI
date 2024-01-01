import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsArrayComponent } from './products-array.component';

describe('ProductsArrayComponent', () => {
  let component: ProductsArrayComponent;
  let fixture: ComponentFixture<ProductsArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
