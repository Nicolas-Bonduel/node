import yup from 'yup';

export const removeMenuItemSchema = yup.object({
    body: yup.object({
      name: yup.string().min(2).required()
    })
  });

  export default removeMenuItemSchema;