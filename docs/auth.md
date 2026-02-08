# Auth0 + Strapi (OIDC/OAuth2)

## Requisitos de entorno

Front (Next.js):
- AUTH0_DOMAIN
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_SECRET
- AUTH0_BASE_URL
- AUTH0_AUDIENCE
- STRAPI_BASE_URL

Back (Strapi):
- AUTH0_ISSUER (debe terminar en `/`)
- AUTH0_AUDIENCE

## Como arrancar

1) Strapi
```powershell
cd server
pnpm install
pnpm develop
```

2) Next.js
```powershell
cd front-app
pnpm install
pnpm dev
```

## Flujo de login

- Iniciar sesion en: `http://localhost:3000/api/auth/login`
- Luego abrir: `http://localhost:3000/api/me`
  - Este endpoint (BFF) obtiene el Access Token y llama a Strapi `/api/me`.

## Llamar a Strapi directo (dev)

Necesitas un Access Token valido para tu API (audience = AUTH0_AUDIENCE). En dev puedes obtener uno con OAuth2 (client credentials) desde Auth0 y luego llamar a Strapi. Ejemplo con placeholders:

```bash
curl -X POST "https://YOUR_TENANT.us.auth0.com/oauth/token" \
  -H "content-type: application/json" \
  -d '{"client_id":"YOUR_CLIENT_ID","client_secret":"YOUR_CLIENT_SECRET","audience":"YOUR_AUDIENCE","grant_type":"client_credentials"}'
```

Luego usa el `access_token`:

```bash
curl -i http://localhost:1337/api/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Errores esperados

- Falta Authorization header:
  - Strapi responde 401 `Missing Bearer token`
- issuer incorrecto:
  - Strapi responde 401 `Invalid token`
- audience incorrecto:
  - Strapi responde 401 `Invalid token`

## Checklist de seguridad

- AUTH0_ISSUER termina con `/`
- JWT con RS256
- Validacion estricta de issuer y audience
- JWKS remoto desde `${AUTH0_ISSUER}.well-known/jwks.json`
- Sin tokens en localStorage
