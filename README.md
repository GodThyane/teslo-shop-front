# Next.js Teslo Shop App

Para correr localmente, se necesita la base de datos

```bash
docker-compose up -d
```

* El -d, significa __detached__

* MongoDb URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__ y configurar las variables de entorno.

* Reconstruir los módulos de Node y levantar Next
    ```
    pnpm install || npm install || yarn install
    next dev
    ```
  
## Llenar la base de datos con información de pruebas

Llamar a:

```
http://localhost:3001/api/seed
```
