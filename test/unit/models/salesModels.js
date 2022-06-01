const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db");
const salesModel = require("../../../models/sales");

describe("Insere uma nova venda no BD sales", () => {
  before(() => {
      const dados = [{insertId: 3}]
    sinon.stub(connection, "execute").resolves(dados);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("retorna o id da venda", async () => {
      const response = await salesModel.addSalesNow();
      expect(response).to.be.equal(3);
    });
  });

});
describe('Busca todas as vendas no BD', () => {
    const resultExecute = [
      {
          "saleId": 1,
          "date": "2022-05-31T20:46:10.000Z",
          "productId": 1,
          "quantity": 10
      },
      {
          "saleId": 1,
          "date": "2022-05-31T20:46:10.000Z",
          "productId": 2,
          "quantity": 20
      },
      {
          "saleId": 2,
          "date": "2022-05-31T20:46:10.000Z",
          "productId": 3,
          "quantity": 30
      }
  ];
    before(() => {

      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um object', async () => {
      const [response] = await salesModel.getAll();

      expect(response).to.be.an('object');
    });

    it('o array tenha o tamanho 3', async () => {
      const response = await salesModel.getAll();
      expect(response).to.have.lengthOf(3);
    });

    it('tais itens possui as propriedades: "saleId", "date", "productId", "quantity"', async () => {
        const item = await salesModel.getAll();
        
        expect(item[0]).to.include.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity',
        );
        expect(item[1]).to.include.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity',
          );
        expect(item[2]).to.include.all.keys(
          'saleId',
          'date',
          'productId',
          'quantity',
        );
    });
});

describe('Buscar uma venda no BD por ID', () => {
    describe('quando encontra o ID', () => {
        const resultById = [
            {
                date: "2022-05-31T20:46:10.000Z",
                productId: 3,
                quantity: 15
            }
        ];
      before(() => {
  
        sinon.stub(connection, 'execute').resolves(resultById);
      });
  
      after(() => {
        connection.execute.restore();
      });
      it('retorna um objeto', async () => {
        const [response] = await salesModel.getById(2);
  
        expect(response).to.be.a('object');
      });
      it('tais itens possui as propriedades: "date", "productId", "quantity"', async () => {
        const [item] = await salesModel.getById(2);
  
        expect(item).to.include.all.keys(
            'date',
            'productId',
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
          const response = await salesModel.getById(resultById[0].id);
          expect(response).to.be.empty;
        });
    });

});

describe('Atualizar uma venda no BD', () => {
    describe('quando encontra o ID', () => {
        const putProducts =   [
            {
              id:2,
              productId: 3,
              quantity: 1
            }
          ];
      before(() => {
        const response = [{ affectedRows: 1 }]
        sinon.stub(connection, 'execute').resolves(response);
      });
  
      after(() => {
        connection.execute.restore();
      });
      it('retorna o objeto atualizado', async () => {
        const response = await salesModel.update(putProducts[0].productId, putProducts[0].quantity, putProducts[0].id);
        expect(response).to.be.equal(1);
      });
    });
});
