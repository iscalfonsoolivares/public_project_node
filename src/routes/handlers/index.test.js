const { authHandlers } = require('./index');

describe('Endpoints', () => {
  describe('Auth ', () => {
    it('get Test', () => {

      const dependencies = {
        dbConn: {}, 
        keys: {}, 
        jwt: {}, 
        validPassword: () => {}
      }

      const req = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }

      authHandlers(  dependencies  ).getTest( {}, req )

      expect(req.status.mock.calls).toEqual([ 
        [ 200 ] 
      ]);
      expect(req.send.mock.calls).toEqual([ 
        [ { message: 'You have the token !!' } ] 
      ]);

    })
  });
});
