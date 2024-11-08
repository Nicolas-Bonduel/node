import yup from 'yup';

export const editCompanySchema = yup.object({
    body: yup.object({
      name: yup.string().min(2)
    })
  });

  export default editCompanySchema;