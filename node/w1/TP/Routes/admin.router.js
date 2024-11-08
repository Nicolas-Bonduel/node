import express from 'express';
import {
  getCompanies,
  getCompany,
  addCompany,
  editCompany,
  getMenus,
  getMenu,
  addMenu,
  editMenu,
  addMenuItem,
  removeMenuItem
} from '../Controllers/admin.controller.js';
import validate from '../plugins/yup/validate.js';
import addCompanySchema from '../plugins/yup/Schemas/addCompany.schema.js';
import addMenuItemSchema from '../plugins/yup/Schemas/addMenuItem.schema.js';
import removeMenuItemSchema from '../plugins/yup/Schemas/removeMenuItem.schema.js';

const router = express.Router();


router.get('/companies', getCompanies);
router.get('/company/:id', getCompany);
router.post('/company/add', validate(addCompanySchema), addCompany);
router.post('/company/:id/edit', editCompany);

router.get('/menus', getMenus);
router.get('/menu/:id', getMenu);
router.post('/menu/add', addMenu);
router.post('/menu/:id/edit', editMenu);
router.post('/menu/:id/add', validate(addMenuItemSchema), addMenuItem);
router.post('/menu/:id/remove', validate(removeMenuItemSchema), removeMenuItem);


export default router;