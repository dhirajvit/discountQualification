import { reducer, getCheckoutPrice } from "./utils";
import pricingRules from "./offers.json";

import { Accumulator, Status, validSku } from "./types";
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
test("utils exists", () => {
  expect(reducer).toBeDefined;
  expect(initialState).toBeDefined;
  expect(initialValue).toBeDefined;
});
test("utils reducer for 3 for 2 rule", () => {
  let response: Accumulator = reducer(initialState, "cari");
  let expectedResponse = {
    ...initialState,
    cari: { status: 1, totalPrice: 109.5, totalCount: 1 },
  };
  expect(response).toEqual(expectedResponse);
  expectedResponse = {
    ...expectedResponse,
    cari: { status: 2, totalPrice: 219.0, totalCount: 2 },
  };
  response = reducer(response, "cari");
  expect(response).toEqual(expectedResponse);
  expectedResponse = {
    ...expectedResponse,
    cari: { status: 0, totalPrice: 219, totalCount: 3 },
  };
  response = reducer(response, "cari");
  expect(response).toEqual(expectedResponse);
  expectedResponse = {
    ...expectedResponse,
    cari: { status: 1, totalPrice: 328.5, totalCount: 4 },
  };
  response = reducer(response, "cari");
  expect(response).toEqual(expectedResponse);
});

test("util reducer for bulk discount", () => {
  let response: Accumulator = reducer(initialState, "homei");
  let expectedResponse = {
    ...initialState,
    homei: { status: 0, totalPrice: 549.99, totalCount: 1 },
  };
  expect(response).toEqual(expectedResponse);

  response = reducer(response, "homei");
  expectedResponse = {
    ...initialState,
    homei: { status: 0, totalPrice: 1099.98, totalCount: 2 },
  };
  expect(response).toEqual(expectedResponse);

  response = reducer(response, "homei");
  response = reducer(response, "homei"); // count 4
  response = reducer(response, "homei");
  expectedResponse = {
    ...response,
    homei: { status: 0, totalPrice: 2749.95, totalCount: 5 },
  };
});

test("util reducer for pet discount", () => {
  let productList: Array<validSku> = ["peti"];
  let response: Accumulator = reducer(
    initialState,
    productList[0],
    productList
  );
  expect(response.peti.totalCount).toEqual(1);
  expect(response.peti.totalPrice).toEqual(30);
  productList = [...productList, "healthi"];
  response = reducer(response, productList[1], productList);
  productList = [...productList, "peti"];
  response = reducer(response, productList[2], productList);
  expect(response.peti.totalCount).toEqual(2);
  expect(response.peti.totalPrice).toEqual(0);
});
test("getCheckoutPrice exists", () => {
  expect(getCheckoutPrice).toBeDefined;
  expect(typeof getCheckoutPrice(null)).toEqual("function");
  let response = getCheckoutPrice(pricingRules)(initialState, "cari");
  expect(response.cari.status).toEqual(1);
});
