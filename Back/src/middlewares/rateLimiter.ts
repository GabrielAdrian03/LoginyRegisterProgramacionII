import type { Request, Response, NextFunction } from 'express';
import { timeStamp } from 'node:console';

const registroPeticiones: Record<string, number[]> = {};

export const middlewareRateLimiter = (
    req: Request,
    res: Response,
    next: NextFunction

): any => {
    //obtiene direccion del cliente
    const clienteIP = req.ip || req.socket.remoteAddress || 'IP_DESCONOCIDA';
    const ahora = Date.now();
    const unMinuto = 60 * 1000;

    //crea el historial si es la primera vez
    if (!registroPeticiones[clienteIP]) {
        registroPeticiones[clienteIP] = [];
    }

    //filtra y deja las peticiones del ultimo minuto
    registroPeticiones[clienteIP] = registroPeticiones[clienteIP].filter(
        (timeStamp) => ahora - timeStamp < unMinuto
    );

    //si hizo 3 peticiones en el mismo minuto
    if (registroPeticiones[clienteIP].length > 2) {
        return res.status(429).json({
            success: false,
            messaje: 
            'Demasiados intentos durante el ultimo minuto, direccion IP bloqueada por seguridad'
        });
    }

    //sinó se registra la cantidad de peticiones
    registroPeticiones[clienteIP].push(ahora);
    next();
}