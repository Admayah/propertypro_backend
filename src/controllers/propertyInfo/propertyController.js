import app from '../../app';
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
export const getAllProperties = async (req, res) => {
  const {rooms} = req.query;
  console.log('query showing no of rooms', rooms)
  try {
    if (rooms && !rooms === 'All') {
      const getProperties = await propertyModel.select('*', ` WHERE no_of_rooms = '${rooms}' `);
      console.log('filtered by no of rooms', getProperties);
      return res.status(200).json(getProperties.rows);
    }
    const getProperties = await propertyModel.select('*');
    if (getProperties.rows.length === 0) {
      return res.status(404).json({ message: 'Properties are not posted' });
    }
    res.status(200).json(getProperties.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ messages: err.stack.messages });
  }
};

// const hello = [
//   {
//     icon: "facebookIcon",
//     href: "https://fb.com/",
//   },
//   {
//     icon: "whatsappIcon",
//     href: "https://wa.me/",
//   },
//   {
//     icon: "instagramIcon",
//     href: "https://instagram.com/",
//   },
//   {
//     icon: "twitterIcon",
//     href: "https://twitter.com/",
//   },
// ];

// eslint-disable-next-line consistent-return
// export const getAllProperties = async (req, res, next) => {

//     const newHelo = hello.slice(startIndex, endIndex)
// console.log('sliced row====>', newHelo)
// res.json(newHelo)
// next()
// };



// export const helloPaginate = async (req, res) => {

// const page = req.query.page || 1;
// const limit = req.query.limit || 3

// const startIndex = (page - 1) * limit
// const endIndex = page * limit
// }
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

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

export const fetchPaginate = async (req, res) => {
  const {page, size} = req.query;
  console.log(page, size)
  const { limit, offset } = getPagination(page, size);
  console.log(limit, offset)

  const getPaginatedproperties = await propertyModel.select('*', ` WHERE limit = ${limit} `)
  console.log(getPaginatedproperties)

  }

export const getAgentProperty = async (req, res) => {
  const userId = req.params.id
  const { id } = req.user.newUser;
  try {
    const getProperties = await propertyModel.select('*', ` WHERE  id = ${userId}  AND agent_id = ${id} `);
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


// export const pagenateUser = (req, res) => {
// res.json(userArr)
// }

export const getAllPostedProperties = async(req, res, next) => {
 const getProperties = await propertyModel.select('*');
 const {rows} = getProperties
 req.properties = rows
 next()
}


export const fetchPaginatedData = (model) => {
  return async (req, res, next) => {
    model = req.properties
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit
      }
    }
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    results.result = model.select('*', `ORDER BY id
    LIMIT=${limit} OFFSET=${startIndex}`)
    res.paginatedPages = results
    next()
  }
}

export const paginatedProperties = (req, res) => {
  res.json(res.paginatedPages)
};