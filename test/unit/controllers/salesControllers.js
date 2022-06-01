const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/sales");
const salesController = require("../../../controllers/sales");

describe("quando é criado com sucesso", async () => {
    const response = {};
    const request = {};
  
    request.body =   [
        {
          productId: 1,
          quantity: 1
        }
      ]
    const resultExpected = { result:{ id: 3, itemsSold: [ { productId: 1, quantity: 1 } ] }}
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesService, "createSales").resolves(resultExpected);
    });
  
    after(() => {
      salesService.createSales.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await salesController.createSale(request, response);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  
    it('é chamado o send com o request.body', async () => {
      await salesController.createSale(request, response);
  
      expect(response.json.calledWith(resultExpected.result)).to.be.equal(true);
    });
});

describe("quando a busca pelas vendas é feita com sucesso", async () => {
    const response = {};
    const request = {};
    const resulExpected = {
        result: [
            {
              saleId: 1,
              date: '2022-06-01T20:01:37.000Z',
              productId: 1,
              quantity: 10
            },
            {
              saleId: 1,
              date: '2022-06-01T20:01:37.000Z',
              productId: 2,
              quantity: 20
            },
            {
              saleId: 2,
              date: '2022-06-01T20:01:37.000Z',
              productId: 3,
              quantity: 30
            }
          ]
      }
    // request.body = {}; //caso precise de um body // post //update
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesService, "getSales").resolves(resulExpected);
    });
  
    after(() => {
      salesService.getSales.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await salesController.getSales(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await salesController.getSales(request, response);
  
      expect(response.json.calledWith(resulExpected.result)).to.be.equal(true);
    });
});

describe("quando a busca das vendas pelo id não é feita com sucesso", async () => {
    const response = {};
    const request = {};
    const messageExpected = {
        message: 'Sale not found'
    }
    const resulExpected = {
        result: [],
      }
      request.params = 6
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesService, "getSales").resolves(resulExpected);
    });
  
    after(() => {
      salesService.getSales.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await salesController.getSalesById(request, response);
  
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await salesController.getSalesById(request, response);
  
      expect(response.json.calledWith(messageExpected)).to.be.equal(true);
    });
});

describe("quando é possivel atualizar uma venda com sucesso", async () => {
    const response = {};
    const request = {};
    request.body =   [
        {
          productId: 3,
          quantity: 1
        }
      ]
      const resultExpected = {result:{ saleId: 2, itemUpdated: [ { productId: 3, quantity: 1 } ] }}
      request.params = 2
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesService, "updateSales").resolves(resultExpected);
    });
  
    after(() => {
      salesService.updateSales.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await salesController.updateSale(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await salesController.updateSale(request, response);
  
      expect(response.json.calledWith(resultExpected.result)).to.be.equal(true);
    });
});

describe("quando não é possivel deletar uma venda com sucesso", async () => {
    const response = {};
    const request = {};
    const resultExpected = { result: null }
    const messageExpected = { message: 'Sale not found' }
    request.params = 1
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesService, "deleteSales").resolves(resultExpected);
    });
  
    after(() => {
      salesService.deleteSales.restore();
    });
  
    it("é chamado o status com o código 204", async () => {
      await salesController.deleteSale(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await salesController.deleteSale(request, response);
  
      expect(response.json.calledWith(messageExpected)).to.be.equal(true);
    });
});