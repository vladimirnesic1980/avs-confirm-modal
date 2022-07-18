import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AvsConfirmModalComponent } from './avs-confirm-modal.component';

export const testingModule = {
  imports: (routes: Routes = []) => {
    return [
      HttpClientTestingModule,
      CommonModule,
      BrowserModule,
      RouterTestingModule.withRoutes(routes),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader,
        },
      }),
    ];
  },
};

export const fakeConfirmModalOptions = {
  confirmBtnText: 'Confirm',
  cancelBtnText: 'Cancel',
  closeText: 'Are you sure',
  modalSize: 'md edit-modal',
};

describe('AvsConfirmModalComponent ', () => {
  let component: AvsConfirmModalComponent;
  let fixture: ComponentFixture<AvsConfirmModalComponent>;
  let de: DebugElement;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    const imports = testingModule.imports();
    await TestBed.configureTestingModule({
      imports: [imports],
      declarations: [AvsConfirmModalComponent],
      providers: [NgbActiveModal],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvsConfirmModalComponent);
    activeModal = TestBed.inject(NgbActiveModal);
    component = fixture.componentInstance;
    component.options = fakeConfirmModalOptions;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancel', () => {
    // GIVEN
    const spyModalClose = spyOn(activeModal, 'dismiss');
    // WHEN
    de.query(By.css('#t-modal-cancel')).nativeElement.click();
    fixture.detectChanges();
    // THEN
    expect(spyModalClose).toHaveBeenCalledTimes(1);
  });

  it('should call confirm', () => {
    // GIVEN
    const spyModalClose = spyOn(activeModal, 'close');
    // WHEN
    de.query(By.css('#t-modal-confirm')).nativeElement.click();
    fixture.detectChanges();
    // THEN
    expect(spyModalClose).toHaveBeenCalledTimes(1);
  });
});
