# Middlewares del Backend usando Express + TypeScript

En la carpeta (`Back/src/middlewares/`) armé dos filtros (middlewares) personalizados para blindar el endpoint de Login de la API. La idea fue separar la seguridad y el control de los datos antes de que lleguen a la lógica del controlador. 

# Esos son:

## 1_Validar Datos ("validarLogin.ts")
- Aplicado por: Ruta puntual (`POST /api/login`)

### ¿Qué hace?
Básicamente es el "filtro de calidad" del formulario. Cuando el usuario hace clic en el botón de ingresar, este middleware frena la petición y revisa que en el `req.body` no viajen datos vacíos, espacios en blanco o correos mal escritos.

### ¿Por qué?
Aunque en el Frontend ya había validaciones ("<InputField />"), la seguridad real pasa por el servidor. Si alguien intenta mandar un correo sin el `@` saltándo el diseño visual, este middleware lo rebota con un estado "400 Bad Request".

## 2_ Limitador de Fuerza Bruta (`rateLimiter.ts`)
- Aplicado por: Ruta puntual (`POST /api/login`)

### ¿Qué hace?
Es el seguridad del Login. Cuenta cuántas peticiones se hace una misma dirección IP en un minuto. Si hace más de 3 veces en menos de 60 segundos, asume que es un robot o un ataque de fuerza bruta intentando adivinar la contraseña y bloquea la IP devolviendo un "429 Too Many Requests".

### ¿Por qué?
Siempre es importante limitar los intentos por muchas cuestiones como el ataque DDoS, intento de adivinar la contraseña, etc. Es clave aplicarlo solo en el Login (ruta puntual) porque ahí es donde están los datos sensibles, asegurando que un usuario común pueda navegar por el resto de las pantallas sin que el sistema lo ande persiguiendo por hacer muchos clics en el botón.

## ¿Cómo se conectan?
- Se encuentran en: (`index.ts`)

En Express podés encadenar los middlewares como si fueran unos cuantos filtros. En el código los pusen en el siguiente orden:

1.  "middlewareRateLimiter": Primero revisa que la IP no esté atacando.
2.  "middlewareValidarLogin": Si la IP está limpia, pasa a revisar que el mail y la contraseña tengan sentido.
3.  "Controller": Si superó los dos filtros anteriores, recién ahí la función evalúa si las credenciales coinciden con las de la "base de datos" (`asd@asd.com` y `asd123` tambien puestos en el index.ts).
