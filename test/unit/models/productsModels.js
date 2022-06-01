const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db");
const productsModel = require("../../../models/products");

describe("Insere um novo produto no BD", () => {
  const payloadProduct =
  {
    name: "manopola",
    quantity: 1,
  };

  before(() => {
    const execute = [{
        id: 4,
        name: "manopola",
        quantity: 1
    }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("retorna um object", async () => {
      const [response] = await productsModel.addProducts(payloadProduct.name, payloadProduct.quantity);

      expect(response).to.be.an("object");
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const [response] = await productsModel.addProducts(payloadProduct);
      expect(response).to.have.a.property("id");
    });
  });


  describe("quando não é inserido com sucesso", async () => {
    it('tal objeto possui o "name" já inserido', async () => {
      const response = await productsModel.checkProducts(payloadProduct.name);
      expect(response).not.to.equal(0);
    });
  });
});
describe('Busca todos os produtos no BD', () => {
    before(() => {
      const resultExecute = [[
        {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
        },
        {
            "id": 2,
            "name": "Traje de encolhimento",
            "quantity": 20
        },
        {
            "id": 3,
            "name": "Escudo do Capitão América",
            "quantity": 30
        }
    ]];

      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });
    it('retorna um array', async () => {
      const [response] = await productsModel.getAll();

      expect(response).to.be.an('array');
    });
    it('o array tenha o tamanho 3', async () => {
      const [response] = await productsModel.getAll();

      expect(response).to.have.lengthOf(3);
    });
    it('tais itens possui as propriedades: "id", "name", "quantity"', async () => {
        const [item] = await productsModel.getAll();
        
        expect(item[0]).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );
        expect(item[1]).to.include.all.keys(
            'id',
            'name',
            'quantity',
          );
        expect(item[2]).to.include.all.keys(
            'id',
            'name',
            'quantity',
        );
    });
});

describe('Buscar um produto no BD por ID', () => {
    describe('quando encontra o ID', () => {
        const resultById = [{
            id: 2,
            name: "Traje de encolhimento",
            quantity: 20
        }];
      before(() => {
  
        sinon.stub(connection, 'execute').resolves(resultById);
      });
  
      after(() => {
        connection.execute.restore();
      });
      it('retorna um objeto', async () => {
        const [response] = await productsModel.getById(2);
  
        expect(response).to.be.a('object');
      });
      it('tais itens possui as propriedades: "id", "name", "quantity"', async () => {
        const [item] = await productsModel.getById(resultById.id);
  
        expect(item).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );
      });
    });

      describe('quando não encontra o ID', () => {
          const resultById = [{
            id: 7,
            name: "Traje de encolhimento",
            quantity: 20
        }];
        before(() => {
            
          sinon.stub(connection, 'execute').resolves([]);
        });
    
        after(() => {
          connection.execute.restore();
        });
        it('retorna um objeto', async () => {
          const [response] = await productsModel.getById(resultById[0].id);
          expect(response).to.equal(undefined);
        });
    });

});

describe('Atualizar um produto no BD', () => {
    describe('quando encontra o ID', () => {
        const putProducts = {
            id: 1,
            name: "manopola",
            quantity: 20
        };
      before(() => {
        const dados = [{affectedRows: 1}]
        sinon.stub(connection, 'execute').resolves(dados);
      });
  
      after(() => {
        connection.execute.restore();
      });
      it('retorna o objeto atualizado', async () => {
        const response = await productsModel.update(putProducts.id, putProducts.name, putProducts.quantity);
        expect(response).to.be.equal(1);
      });
    });
});

describe('Deletar um produto no BD', () => {
    describe('quando encontra o ID', () => {
        const putProducts = {
            id: 1,
            name: "manopola",
            quantity: 20
        };
      before(() => {
        const dados = [{affectedRows: 1}]
        sinon.stub(connection, 'execute').resolves(dados);
      });
  
      after(() => {
        connection.execute.restore();
      });
      it('retorna o objeto atualizado', async () => {
        const response = await productsModel.deleteProduct(putProducts.id);
        expect(response).to.be.equal(1);
      });
    });
});