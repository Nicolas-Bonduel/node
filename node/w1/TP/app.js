import express from 'express';
import authRouter from './Routes/auth.router.js';
import adminRouter from './Routes/admin.router.js';
import userRouter from './Routes/user.router.js';
import auth from './Middlewares/auth.middleware.js';
import admin from './Middlewares/admin.middleware.js';


const app = express();
const port = 3000;

app.use(express.json());


app.use('/', authRouter);
app.use('/', auth, userRouter);
app.use('/admin', admin, adminRouter);


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});