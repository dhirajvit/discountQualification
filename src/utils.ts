// function rule3for2

import { GetCheckoutPrice, Status, Accumulator, validSku } from "./types";
import data from "./productData.json";
/* reducer function to apply discounts*/
import offerData from "./offers.json";

export const reducer = (
  accumulator: Accumulator,
  sku: validSku,
  productList?: Array<validSku>,
  pricingRules: any = offerData
): Accumulator => {
  switch (sku) {
    case "cari": {
      const cariPrice = parseFloat(
        data.productList.filter((item: any) => item.sku === "cari")[0].price
      );
      const buy = pricingRules["3for2"].buy;
      const pay = pricingRules["3for2"].pay;
      const { status, totalCount, totalPrice } = accumulator.cari;
      if (status === buy - 1) {
        /* 3for2.new status = 0, price unchanged for third item*/
        return {
          ...accumulator,
          cari: {
            ...accumulator.cari,
            status: 0,
            totalCount: totalCount + 1,
            totalPrice: totalPrice - cariPrice * (buy - 1) + cariPrice * pay,
          },
        };
      } else {
        return {
          ...accumulator,
          cari: {
            ...accumulator.cari,
            status: status + 1,
            totalCount: totalCount + 1,
            totalPrice: totalPrice + cariPrice,
          },
        };
      }
    }
    case "homei": {
      const bundle = pricingRules["bundle"];
      const { status, totalCount, totalPrice } = accumulator.homei;
      const homeiPrice: number = parseFloat(
        data.productList.filter((item: any) => item.sku === "homei")[0].price
      );
      return {
        ...accumulator,
        homei: {
          ...accumulator.homei,
          totalCount: totalCount + 1,
          totalPrice:
            totalCount >= bundle
              ? (totalCount + 1) * 499.99
              : totalPrice + homeiPrice,
        },
      };
    }
    case "peti": {
      const buyX = pricingRules["buyXgetYFree"].buyX;
      const { totalCount, totalPrice } = accumulator.peti;
      const petiPrice: number = parseFloat(
        data.productList.filter((item: any) => item.sku === "peti")[0].price
      );
      return {
        ...accumulator,
        peti: {
          ...accumulator.peti,
          totalCount: totalCount + 1,
          totalPrice: productList?.find((item) => item === buyX)
            ? 0
            : totalPrice + petiPrice,
        },
      };
    }
    case "healthi": {
      const { totalCount, totalPrice } = accumulator.healthi;
      const healthiPrice: number = parseFloat(
        data.productList.filter((item: any) => item.sku === "healthi")[0].price
      );
      return {
        ...accumulator,
        healthi: {
          ...accumulator.healthi,
          totalCount: totalCount + 1,
          totalPrice: totalPrice + healthiPrice,
        },
      };
    }
    default:
      return accumulator;
  }
};

export const getCheckoutPrice = (pricingRules: any) => {
  let productList: Array<validSku> = [];
  return (accumulator: Accumulator, sku: validSku): Accumulator => {
    productList = [...productList, sku];
    return reducer(accumulator, sku, productList, pricingRules);
  };
};
