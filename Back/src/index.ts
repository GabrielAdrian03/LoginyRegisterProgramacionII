import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

// 📂 CORREGIDO: Rutas relativas ajustadas (cambiado ../src/ por ./)
import { middlewareValidarLogin } from './middlewares/validarLogin.js';
import { middlewareRateLimiter } from './middlewares/rateLimiter.js';

const app = express();
const PORT = 3000;

// Middlewares Globales
app.use(cors());
app.use(express.json());

// Login (POST)
app.post('/api/login',
  // 1° Filtro de límites (Rate Limiting)
  middlewareRateLimiter,
  // 2° Filtro de datos correctos (Validación)
  middlewareValidarLogin,
  (req: Request, res: Response): any => {
    // Al pasar los filtros procede a evaluar los datos
    const { email, password } = req.body;

    // Dato guardado de ejemplo
    if (email === 'asd@asd.com' && password === 'asd123') {
        console.log("inicio exitoso")
      return res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        token: 'jwt-token-generado-por-el-backend-321dsa',
    }
        );
    } 

    return res.status(401).json({
      success: false,
      message: 'Credenciales inválidas. Intenta con asd@asd.com y asd123' // Estilo formal
    });
  }
);

app.listen(PORT, () => {
  console.log('🚀 Backend corriendo en el puerto', PORT);
});
