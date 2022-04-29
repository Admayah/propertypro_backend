import Model from '../../models/model';

const propertyModel = new Model('properties');

// eslint-disable-next-line consistent-return
export const createProperty = async (req, res) => {
  const { id } = req.user.newUser;
  const {
    image, title, address, landArea, noOfRoom, noOfBath, noOfGarage, noOfStore, yearBuild, purpose
  } = req.body;
  const columns = 'agent_id, image_url, title, address, land_area, no_of_rooms, no_of_bathrooms, no_of_garage, no_of_store, year_of_build, purpose';
  const values = `'${id}', '${image}', '${title}', '${address}', '${landArea}', '${noOfRoom}', '${noOfBath}', '${noOfGarage}', '${noOfStore}', '${yearBuild}', '${purpose}' `;
  try {
    const data = await propertyModel.insertWithReturn(columns, values);
    res.status(201).json(data.rows);
  } catch (err) {
    return res.status(500).json({ messages: err.stack.messages });
  }
};

// eslint-disable-next-line consistent-return
export const allProperties = async (req, res) => {
  try {
    const getProperties = await propertyModel.select('*');
    if (getProperties.rows === 0) {
      return res.status(409).json({ message: 'no property' });
    }
    res.status(200).json(getProperties.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack.messages });
  }
};
// eslint-disable-next-line consistent-return
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const getProperty = await propertyModel.select('*', ` WHERE  id = '${id}' `);
    if (getProperty.rows === 0) {
      return res.status(409).json({ message: 'no property' });
    }
    res.status(200).json(getProperty.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack.messages });
  }
};

// eslint-disable-next-line consistent-return
export const editProperty = async (req, res, next) => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await propertyModel.update(req.body, ` WHERE "id" = ${id} `);
    return res.status(201).send({ message: 'user property is edited successfully', success: true });
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
  next();
};

// eslint-disable-next-line consistent-return
export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const getProperty = await propertyModel.delete(` WHERE  id = '${id}' `);
    if (getProperty.rows === 0) {
      return res.status(409).json({ message: 'no property' });
    }
    res.status(200).json(getProperty.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack.messages });
  }
};

// eslint-disable-next-line consistent-return
export const agentProperties = async (req, res) => {
  const userId = req.params.id;
  try {
    const getProperties = await propertyModel.select('*', ` WHERE agent_id = ${userId} `);
    return res.status(200).json(getProperties.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
};
