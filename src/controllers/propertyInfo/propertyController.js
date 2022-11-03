import app from '../../app';
import Model from '../../models/model';
import uploadPropertyImage from '../imageController';

const propertyModel = new Model('properties');

// eslint-disable-next-line consistent-return
export const createProperty = async (req, res) => {

  const { id } = req.user.newUser;
  const {
    title, address, state, landArea, noOfRoom, noOfBath, noOfGarage, noOfStore, yearBuild, purpose, price, description
  } = JSON.parse(req.body.fileName);
  const getImageUrl = await uploadPropertyImage(req)
  const hat = JSON.stringify(getImageUrl)
  const hey = JSON.parse(hat)
  console.log(hey, 'parse')
  const { name, secure_url } = hey
  console.log(name, secure_url, 'heyyyy')
  console.log(uploadPropertyImage(req), 'upload function')
  console.log(req.body, 'create property information')
  console.log((getImageUrl, 'image url with file name'))
  const columns = 'agent_id, image, image_url, title, address, state, land_area, no_of_rooms, no_of_bathrooms, no_of_garage, no_of_store, year_of_build, purpose, price, description';
  const values = `'${id}', '${name}', '${secure_url}', '${title}', '${address}', '${state}', '${landArea}', '${noOfRoom}', '${noOfBath}', '${noOfGarage}', '${noOfStore}', '${yearBuild}', '${purpose}', '${price}', '${description}' `;
  try {
    const data = await propertyModel.insertWithReturn(columns, values);
    res.status(201).json(data.rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ messages: err.stack.messages });
  }
};
export const getAllProperties = async (req, res) => {
  const { rooms, limit, page } = req.query;
  console.log('query showing no of rooms===>', rooms)
  try {
    if (rooms && rooms !== 'All') {
      const getProperties = await propertyModel.select('*', ` WHERE no_of_rooms = '${rooms}' `);
      console.log('filtered by no of rooms', getProperties);
      return res.status(200).json(getProperties.rows);
    }
    const getProperties = await propertyModel.select('*');
    if (getProperties.rows.length === 0) {
      return res.status(404).json({ message: 'Properties are not posted' });
    }
    return res.status(200).json(getProperties.rows);

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
  console.log(id)
  try {
    const getProperty = await propertyModel.select('*', ` WHERE  id = ${id} `);
    if (getProperty.rows.length === 0) {
      return res.status(404).json({ message: 'Property does not exist' });
    }
    res.status(200).json(getProperty.rows);
  } catch (err) {
    console.log(err)
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

// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;
//   return { limit, offset };
// };

// export const fetchPaginate = async (req, res) => {
//   const {page, size} = req.query;
//   console.log(page, size)
//   const { limit, offset } = getPagination(page, size);
//   console.log(limit, offset)

//   const getPaginatedproperties = await propertyModel.select('*', ` WHERE limit = ${limit} `)
//   console.log(getPaginatedproperties)

//   }

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
  // const { id } = req.user.newUser;
  // const singleInfo = req.body;
  try {
    const singleItem = await propertyModel.select(req.body, `  WHERE id = ${userId}  AND agent_id = ${id} `);
    return res.status(200).send(singleItem.rows);
  } catch (err) {
    res.status(500).json({ messages: err.stack });
  }
  next();
};

// eslint-disable-next-line consistent-return
export const editProperty = async (req, res, next) => {
  const userId = req.params.id;
  const { id } = req.user.newUser;
  console.log(req.body)
  const editedInfo = JSON.parse(req.body.fileName);
  const getImageUrl = await uploadPropertyImage(req)
  const hat = JSON.stringify(getImageUrl)
  const hey = JSON.parse(hat)
  console.log(hey, 'edit parse')
  const { name, secure_url } = hey
  const image = name;
  const image_url = secure_url;
  console.log(name, secure_url, 'edit heyyyy')
  const hello = {...editedInfo, image, image_url}
  console.log(hello, 'helllooo')
  try {
    await propertyModel.update(hello, `  WHERE id = ${userId}  AND agent_id = ${id} `);
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
  console.log(userId, 'property id')
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

export const getAllPostedProperties = async (req, res, next) => {
  const { rooms } = req.query
  const { purpose } = req.query
  console.log(purpose, '////')
  if (!purpose && rooms && rooms !== 'All') {
    const getProperty = await propertyModel.select('*', ` WHERE no_of_rooms = '${rooms}' `);
    console.log('filtered by no of rooms', rooms);
    const { rows } = getProperty
    req.properties = rows
  } else if (purpose) {
    if (rooms && rooms !== 'All') {
      const getProperties = await propertyModel.select('*', ` WHERE purpose = '${purpose}' AND no_of_rooms = '${rooms}' `);
      const { rows } = getProperties
      console.log('destructured row')
      req.properties = rows
    } else {
      const getProperties = await propertyModel.select('*', ` WHERE purpose = '${purpose}' `);
      const { rows } = getProperties
      console.log('destructured row')
      req.properties = rows
    }

  } else if (purpose && rooms && rooms !== 'All') {
    console.log(purpose, rooms, '====>')
    const getProperties = await propertyModel.select('*', ` WHERE purpose = '${purpose}' AND no_of_rooms = '${rooms}' `);
    const { rows } = getProperties
    console.log('destructured row')
    req.properties = rows
  } else {
    const getProperties = await propertyModel.select('*');
    const { rows } = getProperties
    console.log('destructured row')
    req.properties = rows
  }

  next()
}


export const fetchPaginatedData = async (req, res, next) => {

  const model = req.properties
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  // console.log(page, 'page value')
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const results = {}
  if (startIndex > 0) {
    results.prev = {
      pageSize: page - 1,
      limit: limit,
      // dataLength: model.length
    }
  }
  if (endIndex < model.length) {
    results.next = {
      pageSize: page + 1,
      limit: limit,

    }
  }
  const totalPage = Math.ceil(model.length / limit)
  console.log(totalPage, 'totalPage')
  results.totalPage = totalPage
  results.dataLength = model.length
  results.result = model.slice(startIndex, endIndex)
  res.paginatedPages = results

  // results.result = propertyModel.select('*', `
  // LIMIT = ${limit} OFFSET = ${startIndex}`)

  next()
}
// }

export const paginatedProperties = (req, res) => {
  try {
    res.json(res.paginatedPages)

  } catch (error) {
    console.log(error)
  }
  // console.log(res.paginatedPages, 'answer=======<')
};