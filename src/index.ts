import pricingRules from "./offers.json";
import { getCheckoutPrice } from "./utils";
import { Status, Accumulator } from "./types";

 const initialValue: Status = {
  status: 0,
  totalPrice: 0,
  totalCount: 0,
};
 const initialState: Accumulator = {
  cari: initialValue,
  healthi: initialValue,
  homei: initialValue,
  peti: initialValue,
};
let checkOut = getCheckoutPrice(pricingRules);
// ['cari','cari','cari','peti']
let response = checkOut(initialState, "cari");
response = checkOut(response, "cari");
response = checkOut(response, "cari");
response = checkOut(response, "peti");
console.log(response);
/*
[NODEMON] {
[NODEMON]   cari: { status: 0, totalPrice: 219, totalCount: 3 },
[NODEMON]   healthi: { status: 0, totalPrice: 0, totalCount: 0 },
[NODEMON]   homei: { status: 0, totalPrice: 0, totalCount: 0 },
[NODEMON]   peti: { status: 0, totalPrice: 30, totalCount: 1 }
[NODEMON] }
*/

checkOut = getCheckoutPrice(pricingRules);
//['cari', 'homei', 'homei', 'cari', 'homei', 'homei', 'homei']
response = checkOut(response, "homei");
response = checkOut(response, "homei");
response = checkOut(response, "homei");
console.log(response);
/*
[NODEMON] {
[NODEMON]   cari: { status: 1, totalPrice: 109.5, totalCount: 1 },
[NODEMON]   healthi: { status: 0, totalPrice: 0, totalCount: 0 },
[NODEMON]   homei: { status: 0, totalPrice: 2499.95, totalCount: 5 },
[NODEMON]   peti: { status: 0, totalPrice: 0, totalCount: 0 }
[NODEMON] }
*/
checkOut = getCheckoutPrice(pricingRules);
//['healthi','peti','homei']
response = checkOut(initialState, "healthi");
response = checkOut(response, "peti");
response = checkOut(response, "homei");
console.log(response);
/*[NODEMON] {
[NODEMON]   cari: { status: 0, totalPrice: 0, totalCount: 0 },
[NODEMON]   healthi: { status: 0, totalPrice: 1399.99, totalCount: 1 },
[NODEMON]   homei: { status: 0, totalPrice: 549.99, totalCount: 1 },
[NODEMON]   peti: { status: 0, totalPrice: 0, totalCount: 1 }
[NODEMON] }
*/
