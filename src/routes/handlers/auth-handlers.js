const authHandlers = ({ dbConn, keys, jwt, validPassword }) => (
  {

    postLogin: (req, res) => {

      const query = dbConn.query('SELECT * FROM user WHERE username = ? AND status = 1 AND is_deleted = 0', [req.body.username] , function (error, results, fields) {
        
        console.log('sql : ', query.sql);

        if (error) { return res.status(403).json({ error : 'Invalid login or password'}); }
 
        if (results.length === 0) {
          return res.status(403).json({ error : 'Invalid login or password'});
        }

        validPassword(req.body.password, results[0].password ).then( isValid => {

            if(isValid){

              const userTokenData = {
                id: results[0].id_user
              }
  
              const token = jwt.sign(userTokenData, keys.jwtKey);
              return res.json({token});
  
            }

            return res.status(403).json({ error : 'Invalid login or password'});

          },
          () => {
            return res.status(403).json({ error : 'Invalid login or password'});
          }          
        )

      });

    },

    getTest: (req, res) => {

      res.status( 200 ).send( { message: 'You have the token !!' });

    },

    postUser: (req, res) => {

      const bearerHeader = req.headers['authorization'];

      if (bearerHeader) {

        const bearer = bearerHeader.split(' ');
        const token = bearer[1]
    
        jwt.verify(token, keys.jwtKey, function(err, decoded ) {

            if(err){
                return res.status(403).json({ error : err});
            }
            const {id } = decoded;
            return res.json({ id });

        });

      }else{

        return res.status(403).json({ error : 'Missing token'});

      }

    },

    postRegister: async (req, res) => {

      try {      

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const userInfo = {
          login: req.body.login,
          app: req.body.app,
          role: req.body.role,
          password: passwordHash
        }

        dbConn.query('INSERT INTO user (username, password, first_name, last_name) VALUES ( ?, ?, "John", "Doe" )', [req.body.username, passwordHash] , function (error, results, fields) {
          if (error) { return res.status(500).json({ error : 'Insert error'}); }
          res.send({ message: 'User created succefully' })
        });

      } catch (error) {
        console.log('this is error: ',error);
      }      

    }
  }
)

module.exports = authHandlers;