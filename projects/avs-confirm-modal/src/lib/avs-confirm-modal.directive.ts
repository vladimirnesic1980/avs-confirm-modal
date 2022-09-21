import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { AvsConfirmModalComponent } from './avs-confirm-modal.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[avsConfirmModal]',
})
export class AvsConfirmModalDirective {
  constructor(
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}
  @Input() title!: string;
  @Input() message!: string;
  @Input() cssClass!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @HostListener('click', ['$event']) onClick(): void {
    this.openModal();
  }

  openModal(): void {
    const options = {
      confirmBtnText: this.translate.instant('Shared.Yes'),
      cancelBtnText: this.translate.instant('Shared.No'),
      closeText: this.translate.instant('Shared.CloseWindow'),
      modalSize: this.cssClass,
    };
    const modalRef = this.modalService.open(AvsConfirmModalComponent, {
      size: options.modalSize,
      backdrop: 'static',
    });
    modalRef.componentInstance.message = this.message;
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.options = options;
    modalRef.result.then(
      () => {
        this.confirm.next();
      },
      () => {
        if (this.cancel) {
          this.cancel.next();
        }
      }
    );
  }
}
