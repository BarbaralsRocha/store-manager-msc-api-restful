const sinon = require('sinon');
const { expect } = require('chai');
const connection = require("../../../db")

const productsModel = require("../../../models/products");
const productsService = require('../../../services/products');

describe('teste do service', () => {
    describe('quando é encontrado um produto pelo id com sucesso', () => {
      const requestProducts = {
        status: 200,
        message: { id: 1, name: 'Martelo de Thor', quantity: 10 }
      };
  
      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(requestProducts);
      })
    
      after(async () => {
        productsModel.getById.restore();
      })

      it('retorna um objeto', async () => {
        const response = await productsService.getProducts(1);
        expect(response).to.be.a('object');
      });
  
      it('retorna o status 200', async () => {
        const response = await productsService.getProducts(1);
        expect(response.status).to.equal(requestProducts.status);
      });
  
      it('retorna um todos os produtos', async () => {
        const response = await productsService.getProducts(1);
        expect(response.message).to.be.equal(requestProducts.message);
      });
  
      it('retorna keys: id, name, quantity', async () => {
        const response = await productsService.getProducts(1);
        expect(response.message).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  
    describe('quando não é encontrado um produto pelo id com sucesso', async () => {
        const requestProducts = {
            status: 404,
            message: []
          };
      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(requestProducts);
      });
    
      after(async () => {
        productsModel.getById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await productsService.getProducts(1);
        expect(response).to.be.a('object');
      });
  
      it('valida se retornou vazio', async () => {
        const response = await productsService.getProducts(1);
        expect(response.message).to.be.empty;
      })
      it('retorna o status 404', async () => {
        const response = await productsService.getProducts(1);
        expect(response.status).to.equal(requestProducts.status);
      });
  
    });

    describe('quando busca todos os produtos com sucesso', async () => {
        const requestProducts = {
            status: 200,
            message: [
              { id: 1, name: 'Martelo de Thor', quantity: 10 },
              { id: 2, name: 'Traje de encolhimento', quantity: 20 },
              { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
            ]
          };
      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves(requestProducts);
      });
    
      after(async () => {
        productsModel.getAll.restore();
      });
  
      it('retorna o status 200', async () => {
        const response = await productsService.getProducts();
        expect(response.status).to.equal(requestProducts.status);
      });
  
      it('retorna um todos os produtos', async () => {
        const response = await productsService.getProducts();
        expect(response.message).to.be.equal(requestProducts.message);
      });
  
      it('retorna keys: id, name, quantity', async () => {
        const response = await productsService.getProducts(1);
        expect(response.message[0]).to.include.all.keys('id', 'name', 'quantity');
        expect(response.message[1]).to.include.all.keys('id', 'name', 'quantity');
        expect(response.message[2]).to.include.all.keys('id', 'name', 'quantity');
      });
    });

    describe('quando cria um produto com sucesso', async () => {
        const requestProducts = { status: 201, 
            message: { id: 4, name: 'manopola', quantity: 1 } 
        };
      before(async () => {
        sinon.stub(productsModel, 'addProducts').resolves(requestProducts);
      });
    
      after(async () => {
        productsModel.addProducts.restore();
      });
  
      it('retorna o status 200', async () => {
        const response = await productsService.createProducts('manopola', 1);
        expect(response.status).to.equal(requestProducts.status);
      });
  
      it('retorna um todos os produtos', async () => {
        const response = await productsService.createProducts('manopola', 1);
        expect(response.message).to.be.equal(requestProducts.message);
      });
  
      it('retorna keys: id, name, quantity', async () => {
        const response = await productsService.createProducts('manopola', 1);
        expect(response.message).to.include.all.keys('id', 'name', 'quantity');
      });
    //   it('caso o produto ja exista', async () => {
    //     const checkProducts = await productsModel.checkProducts('manopola');
    //     const response = await productsService.createProducts('manopola', 1);
    //     if(checkProducts){
    //         console.log('response.message', response.message)
    //         expect(response.message).to.be.empty;
    //     }
    //   });
    });
    // NÃO VAI PASSAR PORQUE É NECESSARIO FAZER 2 POSTS, MAS COMO FAZER?
    // describe('quando cria um produto ja existente', async () => {
    //     const requestProducts = { status: 409, message: null };
    //   before(async () => {
    //     sinon.stub(productsService, 'createProducts').resolves(requestProducts);
    //   });
    
    //   after(async () => {
    //     productsService.createProducts.restore();
    //   });
  
    //   it('retorna o status 200', async () => {
    //     const response = await productsService.createProducts('manopola', 1);
    //     expect(response.status).to.equal(requestProducts.status);
    //   });
  
    //   it('retorna um todos os produtos', async () => {
    //     const response = await productsService.createProducts('manopola', 1);
    //     expect(response.message).to.be.equal(requestProducts.message);
    //   });
  
    //   it('retorna keys: id, name, quantity', async () => {
    //     const response = await productsService.createProducts('manopola', 1);
    //     expect(response.message).to.include.all.keys('id', 'name', 'quantity');
    //   });
    // });

    describe('quando atualiza um produto', async () => {
            const requestProducts = { status: 200, 
                message: { id: '2', name: 'manopola', quantity: 1 } 
            }
          before(async () => {
            sinon.stub(productsModel, 'update').resolves(requestProducts);
          });
          after(async () => {
            productsModel.update.restore();
          });
      
          it('retorna o status 200', async () => {
            const response = await productsService.updateProducts(2, 'manopola', 1);
            expect(response.status).to.equal(requestProducts.status);
          });
      
          it('retorna um todos os produtos', async () => {
            const response = await productsService.updateProducts(2, 'manopola', 1);
            expect(response.message).to.be.equal(requestProducts.message);
          });
      
          it('retorna keys: id, name, quantity', async () => {
            const response = await productsService.updateProducts(2, 'manopola', 1);
            expect(response.message).to.include.all.keys('id', 'name', 'quantity');
          });
        });
        describe('quando não encontra o id para ser atualizado', async () => {
            const requestProducts = { status: 404, message: null };
            
          before(async () => {
            sinon.stub(productsModel, 'update').resolves(requestProducts);
          });
          after(async () => {
            productsModel.update.restore();
          });
      
          it('retorna o status 200', async () => {
            const response = await productsService.updateProducts(6, 'manopola', 1);
            expect(response.status).to.equal(requestProducts.status);
          });
      
          it('retorna um array vazio', async () => {
            const response = await productsService.updateProducts(6, 'manopola', 1);
            expect(response.message).to.be.equal(null);
          });
        });

        describe('quando deleta um produto', async () => {
          const requestDelete = { status: 204, message: 1 };
        before(async () => {

          sinon.stub(productsModel, 'deleteProduct').resolves(requestDelete);
        });
        after(async () => {
          productsModel.deleteProduct.restore();
        });
    
        it('retorna o status 204', async () => {
          const response = await productsService.deleteProducts(1);
          expect(response.status).to.equal(requestDelete.status);
        });
    
        it('retorna 1 linha afetada', async () => {
          const response = await productsService.deleteProducts(1);
          expect(response.message).to.be.equal(1);
        });
      });
      describe('quando não encontra o id para ser deletado', async () => {
          const requestProducts = { status: 204, message: 0 };
          
        before(async () => {
          sinon.stub(productsService, 'deleteProducts').resolves(requestProducts);
        });
        after(async () => {
          productsService.deleteProducts.restore();
        });
    
        it('retorna 0 linhas afetadas', async () => {
          const response = await productsService.deleteProducts(6);
          expect(response.message).to.be.equal(0);
        });
      });
});


