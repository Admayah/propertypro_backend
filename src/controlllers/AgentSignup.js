import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from '../models/model';

const agentModel = new Model('agents');

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
      return res.status(409).json({ messages: 'Email already Exist' });
    }
    const data = await agentModel.insertWithReturn(columns, values);
    const token = jwt.sign({ id: data.rows.id }, process.env.TOKEN_KEY, {
      expiresIn: '1m',
    });

    res.header('user-created', token).status(200).send({
      token, firstName, lastName, email
    });
  } catch (err) {
    res.status(400).json({ messages: err.stack });
  }
};

export const logAgent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validEmail = await agentModel.select('*', ` WHERE  email = '${email}' `);
    if (!validEmail.rows.length) return res.status(400).json({ messages: 'Email does not exist' });
    const validPassword = await bcrypt.compare(password, validEmail.rows[0].password);
    if (!validPassword) return res.status(400).json({ messages: 'Invalid password' });
    return res.status(200).send('Logged in');
  } catch (err) {
    res.status(400).json({ messages: err.stack });
  }
};
