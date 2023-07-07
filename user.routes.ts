import express, { Request, Response } from 'express';
import User, { IUser } from './user.model';

const router = express.Router();

// Create a user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, age } = req.body;
    const user: IUser = new User({ name, age });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Read user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.deleteOne({ '_id': req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(
      user.deletedCount === 1 ?
        {
          success: true,
          message: "User deleted"
        }
        : user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
