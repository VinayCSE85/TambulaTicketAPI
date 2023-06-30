const jwtUtils = require('../utils/jwtUtils');

exports.authorizeUser = (token)  => {
  // this layer acts as a facade between the jwtUtils and Controller
  // Currently it does nothing but return the result obtained from jwtUtils
  // but additional functionality may be implemented here
  // for example, if only a specific user role needs to be given access.

  // Verify the token
  try{
    return jwtUtils.verifyToken(token);
  }
  catch(error){
    throw new Error(error);
  }
}
