import express from 'express';
import Profile from '../controllers/userProfileController';
import exp from 'constants';

const router=express.Router();
console.log('profile')

router.get('/profile',Profile);

export default router;