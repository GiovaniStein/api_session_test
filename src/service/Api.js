const axios = require('axios');

const verifyCpfIsValid = async (cpf) => {
  try {
    var result = await axios.get(`https://user-info.herokuapp.com/users/${cpf}`);
    if (result.status === 200) {
      return result.data.status;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  verifyCpfIsValid
}