const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // For generating unique room IDs
const path = require('path'); // For serving static files

const app = express();
app.use(bodyParser.json());
app.use(cors());

const rooms = {}; // Temporary in-memory storage for rooms

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Create a room
app.post('/create-room', (req, res) => {
  const { names } = req.body;
  const roomId = uuidv4();
  rooms[roomId] = { names };
  res.json({ roomId });
});

// Serve the private room page
app.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  if (!rooms[roomId]) {
    return res.status(404).send('Room not found');
  }
  res.sendFile(path.join(__dirname, '../frontend/room.html'));
});

// Get room data as JSON (for frontend JavaScript)
app.get('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  if (!rooms[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(rooms[roomId]);
});

// **Add this PUT route here for updating room data**
app.put('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const { names } = req.body;

  if (!rooms[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }

  // Update the room's names array
  rooms[roomId].names = names;
  res.status(200).json({ message: 'Room updated successfully' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));