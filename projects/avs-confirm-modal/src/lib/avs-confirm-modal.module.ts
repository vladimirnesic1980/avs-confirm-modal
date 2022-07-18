import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { AvsConfirmModalComponent } from './avs-confirm-modal.component';
import { AvsConfirmModalDirective } from './avs-confirm-modal.directive';

@NgModule({
  imports: [CommonModule, NgbModule, TranslateModule.forChild()],
  entryComponents: [AvsConfirmModalComponent],
  declarations: [AvsConfirmModalComponent, AvsConfirmModalDirective],
  exports: [NgbModule, AvsConfirmModalComponent, AvsConfirmModalDirective],
})
export class AvsConfirmModalModule {}
