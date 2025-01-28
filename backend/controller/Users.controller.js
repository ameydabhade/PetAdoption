import { body, validationResult } from 'express-validator';
import UserModel from '../Model/Users.model.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const validatePassword = (password) => {
    return password.length >= 8;
};

export async function createUser(req, res) {
    const { Name, Email, Password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    if (!validatePassword(Password)) {
        return res.status(400).json({ message: 'Password should be at least 8 characters long' });
    }

    try {
        const existingUser = await UserModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const userRole = role || 'user';

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new UserModel({
            Name,
            Email,
            Password: hashedPassword,
            role: userRole,
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(400).json({ message: 'Something went wrong while saving user' });
        }

        const { Password: _, ...userWithoutPassword } = savedUser.toObject();
        res.status(201).json(userWithoutPassword);

    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Error saving user', error: err.message });
    }
}

export async function fetchUsers(req, res) {
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

export async function login(req, res) {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const { Password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: 'Authentication successful',
            user: userWithoutPassword,
            role: user.role,
        });

    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Error authenticating user', error: err.message });
    }
}

export const validateLogin = [
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password').notEmpty().withMessage('Password is required')
];

export function loginRoute(app) {
    app.post('/login', validateLogin, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }
        login(req, res);
    });
}

export function registerRoute(app) {
    app.post('/register', [
        body('Email').isEmail().withMessage('Invalid email format'),
        body('Password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
        body('Name').notEmpty().withMessage('Name is required')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }
        createUser(req, res);
    });
}

export function fetchUsersRoute(app) {
    app.get('/users', fetchUsers);
}
