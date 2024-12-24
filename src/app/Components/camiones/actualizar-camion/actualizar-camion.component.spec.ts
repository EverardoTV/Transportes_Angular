import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCamionComponent } from './actualizar-camion.component';

describe('ActualizarCamionComponent', () => {
  let component: ActualizarCamionComponent;
  let fixture: ComponentFixture<ActualizarCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
