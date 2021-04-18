const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authSchema = require('../schemas/auth-schema');
const keys = require('../config/keys');
const authenticate = require('../middleware/autenticate');
const validateInput = require('../middleware/validate-input');

const dbConn = require('../db-conn');
const { authHandlers } = require('./handlers') 

const validPassword = async function(password, passwordStored){

  try {

      if( await bcrypt.compare(password, passwordStored) ){
          return true;
      }else{
          return false;
      }

  } catch (error) {
      throw new Error(error);
  }

}

const handler = authHandlers( { dbConn, keys, jwt, validPassword } );

module.exports = app => {

  app.post('/api/v1/auth/login', validateInput(authSchema.loginData, 'body'), handler.postLogin );
  app.get('/api/v1/auth/test', authenticate, handler.getTest );
  app.post('/api/v1/auth/user', handler.postUser ) ;
    
  if(process.env.NODE_ENV === 'development'){
    app.post('/api/v1/auth/register', handler.postRegister );
  }
    
}