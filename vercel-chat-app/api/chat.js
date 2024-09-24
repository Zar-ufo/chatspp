let messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return all messages
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { username, message } = req.body;

    // Save the message
    messages.push({ username, message, timestamp: new Date().toISOString() });
    return res.status(201).json({ message: 'Message sent successfully' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
