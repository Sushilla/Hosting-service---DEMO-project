import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  constructor() { }

  GenerateRandomIPv4Address() {
    let address = [];
    for (let i = 0; i < 4; i++) {
        address.push(Math.floor(Math.random() * 256));
    }
    return address.join('.');
}
}
