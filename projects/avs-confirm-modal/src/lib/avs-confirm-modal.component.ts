import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'avs-confirm-modal',
  templateUrl: './avs-confirm-modal.component.html',
  styleUrls: ['./avs-confirm-modal.component.scss'],
})
export class AvsConfirmModalComponent {
  @Input() message!: string;
  @Input() title!: string;
  @Input() options!: any;

  constructor(public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss(false);
  }

  confirm(): void {
    this.activeModal.close(true);
  }
}
