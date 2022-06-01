const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require("../../../models/products");
const productsService = require('../../../services/products');

describe('teste do service', () => {
    describe('quando é encontrado um produto pelo id com sucesso', () => {
      const requestProducts = {
        message: { id: 1, name: 'Martelo de Thor', quantity: 10 }
      };
      const responseGetById = [[ { id: 1, name: 'Martelo de Thor', quantity: 10 } ]]
      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(responseGetById);
      })
    
      after(async () => {
        productsModel.getById.restore();
      })

      it('retorna um objeto', async () => {
        const response = await productsService.getProducts(1);
        expect(response).to.be.a('object');
      });
  
      it('retorna as keys: id, name, quantity', async () => {
        const {message} = await productsService.getProducts(1);
        expect(message).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  
    describe('quando não é encontrado um produto pelo id com sucesso', async () => {
      before(async () => {

        sinon.stub(productsModel, 'getById').resolves([[{}]]);
      });
    
      after(async () => {
        productsModel.getById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await productsService.getProducts(5);
        expect(response).to.be.a('object');
      });
  
      it('valida se retornou vazio', async () => {
        const  message  = await productsService.getProducts(5);
        expect(message).to.include.all.keys('message');
        expect(message.message).to.not.include.all.keys('id', 'name', 'quantity')
      })
  
    });

    describe('quando busca todos os produtos com sucesso', async () => {
        const requestProducts = [[
              { id: 1, name: 'Martelo de Thor', quantity: 10 },
              { id: 2, name: 'Traje de encolhimento', quantity: 20 },
              { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
            ]]
      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves(requestProducts);
      });
    
      after(async () => {
        productsModel.getAll.restore();
      });
  
      it('tenha 3 arrays', async () => {
        const {message} = await productsService.getProducts();
        expect(message).to.have.lengthOf(3);
      });
  
      it('retorna keys: id, name, quantity', async () => {
        const {message} = await productsService.getProducts();
        expect(message[0]).to.include.all.keys('id', 'name', 'quantity');
        expect(message[1]).to.include.all.keys('id', 'name', 'quantity');
        expect(message[2]).to.include.all.keys('id', 'name', 'quantity');
      });
    });

    // describe('quando cria um produto com sucesso', async () => {
    //     const requestProducts = { id: 4, name: 'manopola', quantity: 1 };
    //   before(async () => {
    //     sinon.stub(productsModel, 'addProducts').resolves({affectedRows:1});
    //   });
    
    //   after(async () => {
    //     productsModel.addProducts.restore();
    //   });
  
    //   it('retorna um todos os produtos', async () => {
    //     const { message } = await productsService.createProducts('manopola', 1);
    //     expect(message).to.equal(requestProducts);
    //   });
  
    //   it('retorna keys: id, name, quantity', async () => {
    //     const { message } = await productsService.createProducts('manopola', 1);
    //     expect(message).to.include.all.keys('id', 'name', 'quantity');
    //   });
    
    // });
  
    describe('quando atualiza um produto', async () => {
            const requestProducts = { id: '2', name: 'manopola', quantity: 1 } ;

          before(async () => {
            sinon.stub(productsModel, 'update').resolves({affectedRows:1});
          });
          after(async () => {
            productsModel.update.restore();
          });
      
          it('retorna keys: id, name, quantity', async () => {
            const { message } = await productsService.updateProducts(2, 'manopola', 1);
            expect(message).to.include.all.keys('id', 'name', 'quantity');
          });
        });
        
        describe('quando deleta um produto', async () => {
        before(async () => {

          sinon.stub(productsModel, 'deleteProduct').resolves({affectedRows:1});
        });
        after(async () => {
          productsModel.deleteProduct.restore();
        });
    
        it('retorna 1 linha afetada', async () => {
          const { message } = await productsService.deleteProducts(1);
          expect(message.affectedRows).to.be.equal(1);
        });
      });

      describe('quando nao encontra o id a ser deletado', async () => {
        before(async () => {

          sinon.stub(productsModel, 'deleteProduct').resolves({affectedRows:0});
        });
        after(async () => {
          productsModel.deleteProduct.restore();
        });
    
        it('retorna 1 linha afetada', async () => {
          const { message } = await productsService.deleteProducts(1);
          expect(message.affectedRows).to.be.equal(0);
        });
      });

});


