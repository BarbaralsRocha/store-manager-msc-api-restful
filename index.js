const app = require('./app');
require('dotenv').config();

const routers = require('./routers');

app.use(routers);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
