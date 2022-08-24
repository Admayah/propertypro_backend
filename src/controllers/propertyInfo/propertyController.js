import Model from '../../models/model';
import uploadPropertyImage from '../imageController';

const propertyModel = new Model('properties');

// eslint-disable-next-line consistent-return
export const createProperty = async (req, res) => {
  const { id } = req.user.newUser;
  const {
     title, address, landArea, noOfRoom, noOfBath, noOfGarage, noOfStore, yearBuild, purpose, price
  } = JSON.parse(req.body.fileName);
  const getImageUrl = await uploadPropertyImage(req)
  const columns = 'agent_id, image_url, title, address, land_area, no_of_rooms, no_of_bathrooms, no_of_garage, no_of_store, year_of_build, purpose, price';
  const values = `'${id}', '${getImageUrl}', '${title}', '${address}', '${landArea}', '${noOfRoom}', '${noOfBath}', '${noOfGarage}', '${noOfStore}', '${yearBuild}', '${purpose}', '${price}' `;
  try {
    const data = await propertyModel.insertWithReturn(columns, values);
    res.status(201).json(data.rows);
  } catch (err) {
    return res.status(500).json({ messages: err.stack.messages });
  }
};

// eslint-disable-next-line consistent-return
export const getAllProperties = async (req, res) => {
  try {
    const getProperties = await propertyModel.select('*');
    if (getProperties.rows.length === 0) {
      return res.status(404).json({ message: 'Properties are not posted' });
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
    if (getProperty.rows.length === 0) {
      return res.status(404).json({ message: 'Property does not exist' });
    }
    res.status(200).json(getProperty.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack.messages });
  }
};

// eslint-disable-next-line consistent-return
export const getAgentProperties = async (req, res) => {
  const { id } = req.user.newUser;
  try {
    const getProperties = await propertyModel.select('*', ` WHERE agent_id = ${id} `);
    return res.status(200).json(getProperties.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
};

// eslint-disable-next-line consistent-return
export const singleProperty = async (req, res, next) => {
  const userId = req.params.id;
  const { id } = req.user.newUser;
  // const singleInfo = req.body;
  try {
    const singleItem = await propertyModel.select(req.body, `  WHERE id = ${userId}  AND agent_id = ${id} `);
    return res.status(200).send( singleItem.rows );
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
  next();
};

// eslint-disable-next-line consistent-return
export const editProperty = async (req, res, next) => {
  const userId = req.params.id;
  const { id } = req.user.newUser;
  const editedInfo = req.body;
  try {
    await propertyModel.update(req.body, `  WHERE id = ${userId}  AND agent_id = ${id} `);
    return res.status(200).send({ success: true, editedInfo, message: 'Property updated successfully' });
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
  next();
  
};

// eslint-disable-next-line consistent-return
export const deleteProperty = async (req, res) => {
  const userId = req.params.id;
  const { id } = req.user.newUser;
  try {
    await propertyModel.delete(` WHERE id = ${userId} AND agent_id = ${id} `);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ messages: err.stack.messages });
  }
};
