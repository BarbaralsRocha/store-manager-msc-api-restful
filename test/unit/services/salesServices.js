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
});


