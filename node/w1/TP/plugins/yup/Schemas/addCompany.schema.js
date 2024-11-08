import yup from 'yup';

export const addCompanySchema = yup.object({
    body: yup.object({
      name: yup.string().min(2).required()
    })
  });

  export default addCompanySchema;