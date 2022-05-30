const sinon = require("sinon");
const { expect } = require("chai");

const MoviesService = require("../../services/products");

describe('quando não existem produtos no banco de dados ao chamar o controller de getProducts', () => {
      const response = {};
      const request = {};
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(products, 'getProducts').resolves([]);
      });
  
      after(() => {
        products.getProducts.restore();
      });
  
      it('é chamado o método "status" passando o código 200', async () => {
        await products.getProducts(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array', async () => {
        await products.getProducts(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);

});
  
    describe('quando existem produtos no banco de dados', async () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(MoviesService, 'getProducts')
          .resolves([
            {
              title: "Example Movie",
              directedBy: "Jane Dow",
              releaseYear: 1999,
            }
          ]);
      })
  
      after(() => {
        MoviesService.getAll.restore();
      });
  
      it('é chamado o método "status" passando o código 200', async () => {
        await MoviesController.getAll(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um array', async () => {
        await MoviesController.getAll(request, response);
  
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  }); 