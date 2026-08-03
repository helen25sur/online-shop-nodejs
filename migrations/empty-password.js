const bcrypt = require('bcryptjs');

const getNewPassword = async () => {
  const hashedPassword = await bcrypt.hash("test123", 12);
  console.log(hashedPassword);
}

getNewPassword();
