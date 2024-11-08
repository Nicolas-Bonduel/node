import yup from 'yup';

export const addMenuItemSchema = yup.object({
    body: yup.object({
      name: yup.string().min(2).required(),
      category: yup.string().min(2),
      price: yup.number().positive().required(),
      order: yup.number().integer().positive()
    })
  });

  export default addMenuItemSchema;