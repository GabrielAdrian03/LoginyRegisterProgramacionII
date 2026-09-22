import type { Request, Response, NextFunction } from 'express';

export const middlewareValidarLogin = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const { email, password } = req.body;

    //valida si no hay email ni contraseña
    //tambien si estan vacios
    if (!email || !password || email.trim() === '' || password.trim() === '') {

        return res.status(400).json({
            success: false,
            message: 'Falta completar el email o la contraseña'
        });
    }

    // establece formato del email
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //si no sigueese formato
    if (!formatoEmail.test(email)) {
        return res.status(400).json({
            success: false,
            messaje: 'Error de validación! Formato del correo inválido'
        });
    }

    if (password.lenght < 6) {
        return res.status(400).json({
            sucess: false,
            message: 'Error! La contraseña debe tener un mínimo de 6 carácteres.'
        });
    }

    next();
}