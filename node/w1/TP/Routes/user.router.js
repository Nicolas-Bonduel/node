import express from 'express';
import {
  getCompany,
  editCompany,
  getMenus,
  editMenu,
  addMenuItem,
  removeMenuItem
} from '../Controllers/user.controller.js';
import validate from '../plugins/yup/validate.js';
import addMenuItemSchema from '../plugins/yup/Schemas/addMenuItem.schema.js';
import removeMenuItemSchema from '../plugins/yup/Schemas/removeMenuItem.schema.js';

const router = express.Router();


router.get('/company', getCompany);
router.post('/company/edit', editCompany);

router.get('/menus', getMenus);
router.post('/menu/:id/edit', editMenu);
router.post('/menu/:id/add', validate(addMenuItemSchema), addMenuItem);
router.post('/menu/:id/remove', validate(removeMenuItemSchema), removeMenuItem);


export default router;