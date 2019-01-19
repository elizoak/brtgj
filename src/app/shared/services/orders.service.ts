import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()
export class OrdersService {

  constructor(private db: AngularFireDatabase) { }

  getMyOrders(userId: string, email?: string) {
    return this.db.list('/withdraws', {
      query: {
        orderByChild: 'userId',
        equalTo: userId || email
      }
  });
  }
  storeOrders(order) {
    return this.db.list('/withdraws').push(order);
  }
}
