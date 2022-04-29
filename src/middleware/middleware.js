export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(email);
};

export const validPhoneNumber = (number) => {
  const phonenum = /^\d{10}$/;
  return phonenum.test(number);
};

export const checkImageExtension = (image) => {
  const imagePath = /\.(jpe?g|png|gif|bmp)$/i;
  return imagePath.test(image);
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

export const validatePropertyInput = (req, res, next) => {
  const {
    image, title, address, landArea, noOfRoom, noOfBath,
    noOfGarage, noOfStore, yearBuild, purpose
  } = req.body;

  if (!checkImageExtension(image)) {
    res.status(400).send('Property image must be uploaded');
  }
  if (title === '') {
    res.status(400).send('Property require title');
  }
  if (address === '') {
    res.status(400).send('Property requires address');
  }
  if (landArea === '') {
    res.status(400).send('Property land-area is required');
  }
  if (noOfRoom === '') {
    res.status(400).send('no of rooms are required');
  }
  if (noOfBath === '') {
    res.status(400).send('no of baths are required');
  }
  if (noOfGarage === '') {
    res.status(400).send('no of garage are required');
  }
  if (noOfStore === '') {
    res.status(400).send('no of stores are required');
  }
  if (yearBuild === '') {
    res.status(400).send('year of build is required');
  }
  if (purpose === '') {
    res.status(400).send('specify purpose of property');
  }
  next();
};
