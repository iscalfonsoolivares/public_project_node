
/* 
 * property = 'body' || 'query' || 'params'
 */

const validateInput = (schema, property) => { 

  return (req, res, next) => {

    const { error } = schema.validate( req[property] );
    
    const valid = error == null;

    if (valid) { next(); } 
    else { 

      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error", message); 
      res.status(422).json({ error: message });

    } 
  } 
} 

module.exports = validateInput;

// Note: https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk