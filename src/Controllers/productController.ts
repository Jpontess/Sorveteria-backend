import type { Request, Response } from 'express';
import type { ProductService } from '../services/product/product.services.ts';

export class ProductController{
  constructor(private readonly service: ProductService){}

  createProduct = async (req: Request, res: Response) =>{
    try{
      const result = await this.service.createProduct(req.body);      
      return res.status(201).json({
        message: 'Produto criado com sucesso',
        data: result
      });
    }catch (error) {
      return res.status(400).json({
        message: `O seguinte erro aconteceu: ${error}`
      }); 
    };
  };

  getProductAll = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getAllProduct();
      return res.status(200).json({
        data: result
      });
    } catch (error) {
      return res.status(400).json({ 
        message: `${error}`
      });
    }
  };

  getByIdProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id){
        throw new Error('id não encontrado!');
      }

      const result = await this.service.getByIdProduct(id.toString());
      
      return res.status(200).json({
        data: result
      });
    } catch (error) {
      return res.status(400).json({ message: `Erro ao buscar produtos: ${error}` } );
    }
  };
}