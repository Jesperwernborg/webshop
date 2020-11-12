export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export interface ICart {
    movie: IProduct;
}

export interface IUserform {
    firstname:string;
    lastname: string;
    mastercard: string;   
}

export interface IOrder {
    id: number;
    createdBy: string;
    totalPrice: number;
    created: number;
    paymentMethod: string;
}