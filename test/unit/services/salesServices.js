const sinon = require('sinon');
const { expect } = require('chai');
const connection = require("../../../db");
const salesModel= require('../../../models/sales');
const salesService = require('../../../services/sales');

describe('teste do service', () => {

    describe('quando atualiza uma venda', async () => {

          before(async () => {
            sinon.stub(salesModel, 'update').resolves({affectedRows:1});
          });
          after(async () => {
            salesModel.update.restore();
          });
      
          it('retorna keys: saleId, itemUpdated', async () => {
            const {result} = await salesService.updateSales(1, [1, 2]);
            expect(result).to.include.all.keys('saleId', 'itemUpdated');
          });
        });

        describe('quando deleta uma venda', async () => {
            const requestSales = { result: '' }
          before(async () => {
            sinon.stub(salesModel, 'deleteSales').resolves({affectedRows:1});
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

        describe('quando busca todas as  venda com sucesso', async () => {
          const resultExpected = [
            {
              sale_id: 1,
              product_id: 2,
              quantity: 20,
              id: 1,
              name: 'Traje de encolhimento',
              date: '2022-06-01T21:38:58.000Z'
            },
            {
              sale_id: 1,
              product_id: 1,
              quantity: 10,
              id: 1,
              name: 'Martelo de Thor',
              date: '2022-06-01T21:38:58.000Z'
            },
            {
              sale_id: 2,
              product_id: 3,
              quantity: 30,
              id: 2,
              name: 'Escudo do Capitão América',
              date: '2022-06-01T21:38:58.000Z'
            }
          ]

          before(async () => {
            sinon.stub(salesModel, 'getAll').resolves(resultExpected);
          });
      
          after(async () => {
            salesModel.getAll.restore();
          });
      
          it('retorna keys: id, itemsSold', async () => {
            const result = await salesService.getSales();
            console.log('result sales', result)
            expect(result.result).to.have.lengthOf(3)
          });
      });

      describe('quando busca uma venda com sucesso', async () => {
        const resultExpected = [
          {
            sale_id: 1,
            product_id: 2,
            quantity: 20,
            id: 1,
            name: 'Traje de encolhimento',
            date: '2022-06-01T21:38:58.000Z'
          },
          {
            sale_id: 1,
            product_id: 1,
            quantity: 10,
            id: 1,
            name: 'Martelo de Thor',
            date: '2022-06-01T21:38:58.000Z'
          },
        ]

        before(async () => {
          sinon.stub(salesModel, 'getById').resolves(resultExpected);
        });
    
        after(async () => {
          salesModel.getById.restore();
        });
    
        it('retorna keys: id, itemsSold', async () => {
          const result = await salesService.getSales(1);
          console.log('result sales', result)
          expect(result.result).to.have.lengthOf(2)
        });
    });
});


