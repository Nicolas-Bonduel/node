import * as yup from 'yup';

export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(
            {
                body: req.body,
                params: req.params,
                query: req.query,
            },
            { abortEarly: false, strict: true }
        );
        return next();
    } catch (err) {
        if (err instanceof yup.ValidationError) {

            const errors = err.inner.map((error) => {
                const updatedPath = error.path.replace(/^(body|params|query)\./, '');
                const updatedMessage = error.message.replace(/^(body|params|query)\./, '');
                return {
                    path: updatedPath,
                    message: updatedMessage,
                };
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ err: 'Internal Server Error' });
    }
};

export default validate;