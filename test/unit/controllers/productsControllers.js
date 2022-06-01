const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/products");
const productsController = require("../../../controllers/products");

describe("quando é criado um produto com sucesso", async () => {
    const response = {};
    const request = {};
  
    request.body = {
      id: 4,
      name: "manopola",
      quantity: 1
    };
    const resultExpected = {message:{
        id: 4,
        name: "manopola",
        quantity: 1
    }}
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(productsService, "createProducts").resolves(resultExpected);
    });
  
    after(() => {
      productsService.createProducts.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await productsController.newProduct(request, response);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  
    it('é chamado o send com o request.body', async () => {
      await productsController.newProduct(request, response);
  
      expect(response.json.calledWith(resultExpected.message)).to.be.equal(true);
    });
});

describe("quando a busca pelos produtos é feita com sucesso", async () => {
    const response = {};
    const request = {};
    const resulExpected = {
        message: [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
          { id: 2, name: 'Traje de encolhimento', quantity: 20 },
          { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
        ]
      }
    // request.body = {}; //caso precise de um body // post //update
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(productsService, "getProducts").resolves(resulExpected);
    });
  
    after(() => {
      productsService.getProducts.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await productsController.getAllProducts(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await productsController.getAllProducts(request, response);
  
      expect(response.json.calledWith(resulExpected.message)).to.be.equal(true);
    });
});

describe("quando a busca dos produtos pelo id não é feita com sucesso", async () => {
    const response = {};
    const request = {};
    const messageExpected = {
        message: 'Product not found'
    }
    const resulExpected = {
        message: null,
      }
      request.params = 6
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(productsService, "getProducts").resolves(resulExpected);
    });
  
    after(() => {
      productsService.getProducts.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await productsController.getProductById(request, response);
  
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await productsController.getProductById(request, response);
  
      expect(response.json.calledWith(messageExpected)).to.be.equal(true);
    });
});

describe("quando é possivel atualizar um produto com sucesso", async () => {
    const response = {};
    const request = {};
    request.body = {
        name: "manopola",
        quantity: 1
      };
      const resultExpected = {message:{
          id: 1,
          name: "manopola",
          quantity: 1
      }}
      request.params = 1
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(productsService, "updateProducts").resolves(resultExpected);
    });
  
    after(() => {
      productsService.updateProducts.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await productsController.updateProduct(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await productsController.updateProduct(request, response);
  
      expect(response.json.calledWith(resultExpected.message)).to.be.equal(true);
    });
});

describe("quando é possivel deletar um produto com sucesso", async () => {
    const response = {};
    const request = {};
    const resultExpected = {message: 1}
      request.params = 1
    before(() => {
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(productsService, "updateProducts").resolves(resultExpected);
    });
  
    after(() => {
      productsService.updateProducts.restore();
    });
  
    it("é chamado o status com o código 201", async () => {
      await productsController.updateProduct(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é chamado o json com todos os produtos', async () => {
      await productsController.updateProduct(request, response);
  
      expect(response.json.calledWith(resultExpected.message)).to.be.equal(true);
    });
});
