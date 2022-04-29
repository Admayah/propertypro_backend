export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(email);
};
export const validPhoneNumber = (number) => {
  const phonenum = /^\d{10}$/;
  return phonenum.test(number);
};

export const validateUserInput = (req, res, next) => {
  const {
    firstName, lastName, email,
    password, phoneNo
  } = req.body;

  if (firstName.length < 3) {
    return res.status(400).send({ message: 'First name must be more than three character' });
  }
  if (lastName.length < 3) {
    return res.status(400).send({ message: 'last name must be more than three character' });
  }
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'Invalid email' });
  }
  if (password.length < 8) {
    return res.status(400).send({ message: 'password must be 8 or more character long' });
  }
  if (!validPhoneNumber(phoneNo)) {
    return res.status(400).send({ message: 'Invalid phoneNo' });
  }
  return next();
};
