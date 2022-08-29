import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Model from '../models/model';

const agentModel = new Model('agents');

// eslint-disable-next-line consistent-return
export const createAgent = async (req, res) => {
  const saltRounds = 5;
  const {
    firstName, lastName, email, password, phoneNo
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const columns = 'first_name, last_name, email, password, phone_no';
  const values = `'${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${phoneNo}'`;
  try {
    const validEmail = await agentModel.select('*', ` WHERE  email = '${email}' `);
    if (validEmail.rows.length > 0) {
      return res.status(409).json({ message: 'Email already Exist' });
    }
    const data = await agentModel.insertWithReturn(columns, values);
    const { id } = data.rows[0];
    const newUser = {
      id, firstName, lastName, email
    };
    const token = jwt.sign({ newUser, id: data.rows.id }, process.env.TOKEN_KEY, {
      expiresIn: '2d',
    });
    res.status(201).send({ user: newUser, token, message: 'Account created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.stack });
  }
};

// eslint-disable-next-line consistent-return
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validEmail = await agentModel.select('*', ` WHERE  email = '${email}' `);
    console.log('this is the databse info ====>', validEmail)
    if (!validEmail.rows.length) return res.status(400).json({ messages: 'Invalid email or password' });
    const validPassword = await bcrypt.compare(password, validEmail.rows[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });
    const { id, first_name } = validEmail.rows[0];
    const user = { id, first_name, email };
    const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
      expiresIn: '2d',
    });
    return res.status(201).send({ user, token, message: 'Logged in' });
  } catch (err) {
    res.status(400).json({ message: err.stack });
  }
};


export const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.select('*');
    if (agents.rows.length === 0) {
      return res.status(404).json({ message: 'Properties are not posted' });
    }
    res.status(200).json(agents.rows);
  } catch (error) {
    console.log(error)
  }
}

export const singleAgent = async (req, res) => {
  const {id} = req.params
  console.log(id)
  try {
    const agents = await agentModel.select('*', ` WHERE  id = '${id}' `);
    if (agents.rows.length === 0) {
      return res.status(404).json({ message: 'Properties are not posted' });
    }
    res.status(200).json(agents.rows);
  } catch (error) {
    console.log(error)
  }
};