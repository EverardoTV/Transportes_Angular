import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCamionComponent } from './insertar-camion.component';

describe('InsertarCamionComponent', () => {
  let component: InsertarCamionComponent;
  let fixture: ComponentFixture<InsertarCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarCamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertarCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
