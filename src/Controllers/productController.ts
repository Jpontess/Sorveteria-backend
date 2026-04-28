import type { Request, Response } from 'express';
import type { ProductService } from '../services/product/product.services.ts';

export class ProductController{
  constructor(private readonly service: ProductService){}

  createProduct = async (req: Request, res: Response) =>{
    try{
      const result = await this.service.createProduct(req.body);      
      return res.status(201).json({
        message: `${result.name} foi criando com sucesso`,
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
      return res.status(200).json(result);
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
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: `Erro ao buscar produtos: ${error}` } );
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id){
        return Error('Erro ao editar produto, id inválido');
      }

      const result = await this.service.updateByIdProduct(id.toString(), req.body);

      return res.status(200).json(result);
    } catch (error){
      if (error instanceof Error){
        if (error.message === 'Erro ao editar produto, id inválido'){
          return res.status(400).json(error.message);
        }
      }
      return res.status(400).json({
        message: error
      });
    }
  };

  deletedProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id){
        return Error('Error ao deletar, id inválido');
      }
    
      const result = await this.service.softDeleteByIdProduct(id.toString());
    
      return res.status(200).json(result);
    
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  };
}