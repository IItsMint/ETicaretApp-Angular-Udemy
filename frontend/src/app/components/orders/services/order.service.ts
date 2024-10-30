import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { CartService } from '../../carts/services/cart.service';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:GenericHttpService, private _cart: CartService) { }

  create(callBack: (res: MessageResponseModel) => void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = {userId: user._id};

    this._http.post<MessageResponseModel>("orders/create", model, res => {
      this._cart.getCount();
      callBack(res);
    });
  }

  getAll(callBack: (res: OrderModel[]) => void) {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = { userId: user._id };

    this._http.post<OrderModel[]>("orders", model, res => {
        callBack(res);
    });
}



}
