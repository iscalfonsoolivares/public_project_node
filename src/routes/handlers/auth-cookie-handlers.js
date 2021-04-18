const authCoockieHandlears = () => (
  {
    postAuthorizeCookie: (req, res) => {
      res.cookie('token', req.body.token, { expires: new Date(Date.now() + 36000), httpOnly: true });
      res.status(200).send({ message: 'Cookie set!' })  
    },
    getClearCookie: (req, res) => {
      res.clearCookie('token');
      res.send(200, { message: 'Cookie destroyed!' });  
    },
  }
)

module.exports = authCoockieHandlears;