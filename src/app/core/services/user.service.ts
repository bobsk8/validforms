import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setCurrentUser(data: any): void {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  public getCurrentUser(): any {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser') || '');
    }
    return null;
  }
}
