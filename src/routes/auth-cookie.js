const authenticate = require('../middleware/autenticate');
const { authCoockieHandlers } = require('./handlers');

const handler = authCoockieHandlers();

module.exports = app => {
  app.post('/api/v1/auth/authorize-cookie', authenticate, handler.postAuthorizeCookie);  
  app.get('/api/v1/auth/clear-cookie', handler.getClearCookie);  
}


/*
$('.btn-login').click(function() {
    $.ajax({
      type: 'POST',
      url: '/api/v1/auth/login',
      data: {
        login: document.querySelector('#login').value,
        password: document.querySelector('#password').value
      },
      success: function(data) {  
        getJwtCookie(data.token);
      },
      error: function(error) {
        console.log('There was an error: ' + error)
      }
  
    });
  });
  
  function getJwtCookie(token) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/auth/authorize-cookie',
      data: {
        token: token
      },
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      success: function() {
        console.log('Cookie received!');
        window.location.replace("/secret");
      },
      error: function() {
        console.log('Problem with cookie');
      }
    });
  }
*/