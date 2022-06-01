const sinon = require('sinon');
const { expect } = require('chai');
const connection = require("../../../db");
const salesModel= require('../../../models/sales');
const salesService = require('../../../services/sales');

describe('teste do service', () => {
    describe('quando é encontrado um produto pelo id com sucesso', () => {
      const requestSales = [{
        result: [
            { date: '2022-06-01T11:27:10.000Z', productId: 1, quantity: 5 },
            { date: '2022-06-01T11:27:10.000Z', productId: 2, quantity: 10 }
          ]
      }];
  
      before(async () => {
        sinon.stub(salesModel, 'getById').resolves(requestSales);
      })
    
      after(async () => {
        salesModel.getById.restore();
      })

      it('retorna um objeto', async () => {
        const response = await salesService.getSales(1);
        console.log('response', response)
        expect(response).to.be.a('object');
      });
  
      it('retorna um todos as vendas', async () => {
        const response = await salesService.getSales(1);
        expect(response.result).to.be.equal(requestSales.result);
      });
  
      it('retorna keys: date, productId, quantity', async () => {
        const response = await salesService.getSales(1);
        expect(response.result[0]).to.include.all.keys('date', 'productId', 'quantity');
      });
    });
  
    describe('quando não é encontrado um produto pelo id com sucesso', async () => {
        const requestSales = {
            result: []
          };
      before(async () => {
        sinon.stub(salesModel, 'getById').resolves(requestSales);
      });
    
      after(async () => {
        salesModel.getById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await salesService.getSales(1);
        expect(response).to.be.a('object');
      });
  
      it('valida se retornou vazio', async () => {
        const response = await salesService.getSales(1);
        expect(response.result).to.be.empty;
      })
    });

    describe('quando busca todos os produtos com sucesso', async () => {
        const requestSales = {
            result: [
                {
                  saleId: 1,
                  date: '2022-06-01T11:27:10.000Z',
                  productId: 1,
                  quantity: 10
                },
                {
                  saleId: 1,
                  date: '2022-06-01T11:27:10.000Z',
                  productId: 2,
                  quantity: 20
                },
                {
                  saleId: 2,
                  date: '2022-06-01T11:27:10.000Z',
                  productId: 3,
                  quantity: 30
                }
              ]
          };
      before(async () => {
        sinon.stub(salesModel, 'getAll').resolves(requestSales);
      });
    
      after(async () => {
        salesModel.getAll.restore();
      });
  
      it('retorna um todas as vendas', async () => {
        const response = await salesService.getSales(1);
        expect(response.result).to.be.equal(requestSales.result);
      });
  
      it('retorna keys: saleId, date, productId, quantity', async () => {
        const response = await salesService.getSales(1);
        expect(response.result[0]).to.include.all.keys( 'saleId', 'date', 'productId', 'quantity');
        expect(response.result[1]).to.include.all.keys( 'saleId', 'date', 'productId', 'quantity');
        expect(response.result[2]).to.include.all.keys( 'saleId', 'date', 'productId', 'quantity');
      });
    });

    describe('quando cria uma venda com sucesso', async () => {
        const requestSales = { result: 
            { id: 4, 
            itemsSold: [ 
            {
                "productId": 1,
                "quantity": 1
            }
         ] } }
      before(async () => {
        sinon.stub(salesModel, 'addSalesProducts').resolves(requestSales);
      });
    
      after(async () => {
        salesModel.addSalesProducts.restore();
      });
  
  
      it('retorna um todos os produtos', async () => {
        const response = await salesService.createSales([ { productId: 1, quantity: 1 } ]);
        expect(response.result).to.be.equal(requestSales.result);
      });
  
      it('retorna keys: id, itemsSold', async () => {
        const response = await salesService.createSales([ { productId: 1, quantity: 1 } ]);
        expect(response.result).to.include.all.keys('id', 'itemsSold');
      });
    });

    describe('quando atualiza um produto', async () => {
            const requestSales = { result: {
                saleId: 2,
                itemUpdated: [
                    {
                        productId: 3,
                        quantity: 1
                    }
                ]
            }}
          before(async () => {
            sinon.stub(salesModel, 'update').resolves(requestSales);
          });
          after(async () => {
            salesModel.update.restore();
          });
      
          it('retorna um todos os produtos', async () => {
            const response = await salesService.updateSales(1, [1, 2]);
            expect(response.result).to.be.equal(requestSales.result);
          });
      
          it('retorna keys: saleId, itemUpdated', async () => {
            const response = await salesService.updateSales(1, [1, 2]);
            expect(response.result).to.include.all.keys('saleId', 'itemUpdated');
          });
        });
        describe('quando não encontra o id para ser atualizado', async () => {
            const requestSales = { result: null };
            
          before(async () => {
            sinon.stub(salesModel, 'update').resolves(requestSales);
          });
          after(async () => {
            salesModel.update.restore();
          });
      
          it('retorna o status 200', async () => {
            const response = await salesService.updateSales(1, [1, 2]);
            expect(response.result).to.equal(requestSales.result);
          });
      
          it('retorna um array vazio', async () => {
            const response = await salesService.updateSales(1, [1, 2]);
            expect(response.result).to.be.equal(null);
          });
        });

        describe('quando deleta um produto', async () => {
            const requestSales = { result: '' }
          before(async () => {
            sinon.stub(salesModel, 'deleteSales').resolves(requestSales);
          });
          after(async () => {
            salesModel.deleteSales.restore();
          });

          it('retorna um objeto', async () => {
            const response = await salesService.deleteSales(1);
            expect(response).to.be.a('object');
          });
      
          it('retorna um todos os produtos', async () => {
            const response = await salesService.deleteSales(1);
            expect(response.result).to.be.equal(requestSales.result);
          });
      

        });
        describe('quando não encontra o id para ser atualizado', async () => {
            const requestSales = { result: null };
            
          before(async () => {
            sinon.stub(salesService, 'deleteSales').resolves(requestSales);
          });
          after(async () => {
            salesService.deleteSales.restore();
          });

          it('retorna um objeto', async () => {
            const response = await salesService.deleteSales(1);
            expect(response).to.be.a('object');
          });
      
          it('retorna um array vazio', async () => {
            const response = await salesService.deleteSales(1, [1, 2]);
            expect(response.result).to.be.equal(null);
          });
        });
});


