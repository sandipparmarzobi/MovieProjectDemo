import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private layoutSubject = new BehaviorSubject<string>('default');

  setLayout(layout: string) {
    this.layoutSubject.next(layout);
  }

  getLayout() {
    return this.layoutSubject.asObservable();
  }
}
