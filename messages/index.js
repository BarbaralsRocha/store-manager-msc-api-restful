const messages = {
    EXIST_PRODUCT: 'Product already exists',
    NOT_FOUND: 'not found',
    NO_STOCK: 'Such amount is not permitted to sell',
  };
  
  const status404 = (statusCode, message = 'Product') => (
    { statusCode, message: `${message} ${messages.NOT_FOUND}` }
  );

  const status409 = (statusCode) => (
    { statusCode, message: `${messages.EXIST_PRODUCT}` }
  );
  
  const status422 = (statusCode, field) => (
    { statusCode, message: `${messages[field]}` }
  );
  
  const createMessage = (statusCode, field) => {
    switch (statusCode) {
    case 404:
      return status404(statusCode, field);
    case 409:
      return status409(statusCode);
    case 422:
      return status422(statusCode, field);
    default:
      throw new Error('Status Inexistente');
    }
  };
  
  module.exports = {
    createMessage,
  };