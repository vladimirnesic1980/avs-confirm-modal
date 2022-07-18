import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { AvsConfirmModalComponent } from './avs-confirm-modal.component';
import { AvsConfirmModalDirective } from './avs-confirm-modal.directive';

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

export class MockModalRef {
  get closed() {
    return of({});
  }
  componentInstance = {};
  result = Promise.resolve<any>({});
}

export class NgbModalMock {
  open = (_content: any, _options?: NgbModalOptions): MockModalRef =>
    new MockModalRef();
}

@Component({
  template: `<button
    (confirm)="deleteDocument()"
    confirmModal
    id="t-open-modal"
    [title]="'Shared.PleaseConfirm' | translate"
    [message]="'Documents.DeleteDocument' | translate"
  ></button>`,
})
class TestConfirmComponent {
  deleteDocument(): null {
    return null;
  }
}

export class MockElementRef implements ElementRef {
  nativeElement = {};
}
describe('AvsConfirmModalDirective directive ', () => {
  let fixture: ComponentFixture<TestConfirmComponent>;
  let component: TestConfirmComponent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  let modalService: NgbModal;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  let de: DebugElement;
  let translateService: TranslateService;

  beforeEach(() => {
    const imports = testingModule.imports();
    TestBed.configureTestingModule({
      imports: [imports],
      declarations: [TestConfirmComponent, AvsConfirmModalDirective],
      providers: [
        Renderer2,
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
        {
          provide: NgbModal,
          useClass: NgbModalMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfirmComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    translateService = TestBed.inject(TranslateService);
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openModal ', () => {
    // GIVEN
    const spyModalServiceOpen = spyOn(modalService, 'open').and.callThrough();
    const translate = spyOn(translateService, 'instant').and.callThrough();
    // WHEN
    de.query(By.css('#t-open-modal')).nativeElement.click();
    // THEN
    expect(spyModalServiceOpen).toHaveBeenCalledTimes(1);
    expect(spyModalServiceOpen).toHaveBeenCalledWith(AvsConfirmModalComponent, {
      size: 'md edit-modal',
      backdrop: 'static',
    });
    expect(translate).toHaveBeenCalledTimes(3);
  });
});
