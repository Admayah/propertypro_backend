export const validateEmail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(email);
};
export const validPhoneNo = (number) => {
  const phoneno = /^\d{10}$/;
  return phoneno.test(number);
};

export const validateUserInput = (req, res, next) => {
  const { firstName, lastName, email, password, phoneNo } = req.body;

  if (firstName.length < 3 || firstName === '') {
    return res.status(400).send('First name must be more than three character');
  }
  if (lastName.length < 3 || lastName === '') {
    return res.status(400).send('last name must be more than three character');
  }
  if (!validateEmail(email)) {
    return res.status(400).send('Invalid email');
  }
  if (password.length < 8 || password === '') {
    return res.status(400).send('password must be more than three character');
  }
  if (!validPhoneNo(phoneNo)) {
    return res.status(400).send('Invalid phoneNo');
  }
  return next();
};
