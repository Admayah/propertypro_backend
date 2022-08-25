export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(email);
};

export const validPhoneNumber = (number) => {
  const phonenum = /^\d{11}$/;
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
    return res.status(400).send({ message: 'validate phone number to be 11 digits long' });
  }
  return next();
};

// eslint-disable-next-line consistent-return
export const validatePropertyInput = (req, res, next) => {
  const {
    title, address, landArea, noOfRoom, noOfBath,
    noOfGarage, noOfStore, yearBuild, purpose
  } = JSON.parse(req.body.json);

  // if (!checkImageExtension(image)) {
  //   return res.status(400).json({message: 'Property image must be uploaded'});
  // }
  if (!title || title.trim().length < 5) {
    return res.status(400).json({ message: 'Title must be more than 5 characters' });
  }
  if (!address) {
    return res.status(400).json({ message: 'address must be more than 5 characters' });
  }
  if (!landArea) {
    return res.status(400).json({ message: 'landara must be more than 5 characters' });
  }
  if (!noOfRoom) {
    return res.status(400).json({ message: 'Number of rooms are required and must be number' });
  }
  if (!noOfBath) {
    return res.status(400).json({ message: 'Number of baths are  and must be number' });
  }
  if (!noOfGarage) {
    return res.status(400).json({ message: 'Number of garages are required and must be number' });
  }
  if (!noOfStore) {
    return res.status(400).json({ message: 'Number of stores are required and must be number' });
  }
  if (!yearBuild) {
    return res.status(400).json({ message: 'Year of build is required and must be number' });
  }
  if (!purpose) {
    return res.status(400).json({ message: 'purpose of property' });
  }
  next();
};
