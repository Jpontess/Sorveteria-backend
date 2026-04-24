export class ProductDto {
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  image!: string;
  category!: string;
  isAvailable!: boolean;
  deleted?: boolean;
}