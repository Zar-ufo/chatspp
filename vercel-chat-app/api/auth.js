import bcrypt from 'bcryptjs';

const users = []; // In-memory storage for demo purposes

export default async function handler(req, res) {
  const { username, password } = req.body;

  if (req.method === 'POST') {
    const existingUser = users.find(user => user.username === username);

    // If user exists, log them in
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // If user doesn't exist, sign them up
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
