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
    const validEmail = await agentModel.select('*', ` WHERE  email = ${email} `);
    if (validEmail.rows.length > 0) {
      return res.status(409).json({ message: 'Email already Exist' });
    }
    const data = await agentModel.insertWithReturn(columns, values);
    const { id, first_name, last_name, email } = data.rows[0];
    const newUser = {
      id, first_name, last_name, email
    };
    const token = jwt.sign({ newUser }, process.env.TOKEN_KEY, {
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
    const newUser = { id, first_name, email };
    const token = jwt.sign({ newUser }, process.env.TOKEN_KEY, {
      expiresIn: '2d',
    })
    return res.status(201).send({ newUser, token, message: 'Logged in' });
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

// eslint-disable-next-line consistent-return
export const editAgentInfo = async (req, res, next) => {
  const { id } = req.user.newUser;
  const {first_name, last_name, email, password, phone_no, state, city, new_password} = req.body;
  console.log('hello world');
  console.log('this is reques body info', req.body)
  try {
    const selectUser = await agentModel.select('*', ` WHERE id = ${id} `)
    if(new_password){
      const confirmPassword = await bcrypt.compare(password, selectUser.rows[0].password)
      return confirmPassword;
    }
    console.log(selectUser, 'selected user from db')
    if(confirmPassword) {
      await agentModel.update(req.body, ` WHERE id = ${id} `);
      return res.status(200).json({ success: true,  message: 'Profile updated successfully' });
    }
    return res.send(400).json('Incorrect passsword')

  } catch (err) {
    console.log(err)
    res.status(500).json({ messages: err.stack });
  }
  next();
  
};