import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef | null;

  constructor(public modalService: BsModalService) {}

  openLoginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
    });
  }
  openRegisterModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second modal-lg',
    });
  }

  openLoginModalWithCloseRegisterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
    });
    this.closeRegisterModal();
  }
  openRegisterModalWithCloseLoginModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second modal-lg',
    });
    this.closeLoginModal();
  }

  closeLoginModal() {
    debugger;
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeRegisterModal() {
    debugger;
    if (!this.modalRef2) {
      return;
    }
    this.modalRef2.hide();
    this.modalRef2 = null;
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
}
