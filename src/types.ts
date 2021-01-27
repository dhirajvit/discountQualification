export type validSku = "homei" | "cari" | "healthi" | "peti";
type ProductDetails = {
  sku: string;
  name: string;
  price: number;
  category: validSku;
};

interface GetProductDetails {
  (sku: string): ProductDetails;
}
export interface GetCheckoutPrice {
  ({
    listOfProducts,
    rules,
  }: {
    listOfProducts: Array<validSku>;
    rules: any;
  }): number;
}

export interface Status {
  status: number; // waiting for discount qualification
  totalPrice: number;
  totalCount:number
}
export interface Accumulator {
  [key: string]: Status;
}


