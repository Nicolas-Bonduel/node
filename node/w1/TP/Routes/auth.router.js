import express from 'express';
import {
  register,
  login,
  overview
} from '../Controllers/auth.controller.js';
import auth from '../Middlewares/auth.middleware.js';
import admin from '../Middlewares/admin.middleware.js';
import validate from '../plugins/yup/validate.js';
import registerSchema from '../plugins/yup/Schemas/register.schema.js';
import loginSchema from '../plugins/yup/Schemas/login.schema.js';

const router = express.Router();


router.post('/register', [admin, validate(registerSchema)], register);

router.post('/login', validate(loginSchema), login);

router.get('/overview', auth, overview);


export default router;