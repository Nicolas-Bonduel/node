import yup from 'yup';

export const registerSchema = yup.object({
    body: yup.object({
      username: yup.string().min(4).required(),
      password: yup.string()/*.matches("^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$", "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character")*/.required(),
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      company_id: yup.number().required()
    })
  });

  export default registerSchema;