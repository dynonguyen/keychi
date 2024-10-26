<div align="center">
	<img src="./.docs/img/cover.jpg" height="256" />
	<img src="./.docs/img/cover-2.jpg" height="256" />
</div>

# Keychi

<img src="./.docs/img/app-logo.svg" height="64" />

> **Keychi** is the best password manager for securely storing, managing data such as passwords, passkeys, OTP and credit cards.

## 🚀 Getting Started

### Setup environment / start containers

```bash
yarn docker:up

# Stop containers
yarn docker:down
```

### Development

```bash
# Start keychi api server (Golang)
# Install swaggo cli for generating api docs (if not installed)
go install github.com/swaggo/swag/cmd/swag@latest

# Install gow cli for watching file changes and restart server (if not installed)
go install github.com/mitranim/gow@latest
yarn api:dev

# Start keychi web app
yarn web:dev

# Start keychi mobile app

# Start keychi desktop app
```

### Accessing resources

- Minio console: http://localhost:9000
- Postgres server: http://localhost:5432
- Keycloak: http://localhost:8080
- Keychi web: http://localhost:8888
- Keychi API: http://localhost:3000/api/v1/docs/index.html

## 🐥 Documentation

- [Notion](https://www.notion.so/dynonguyen/Keychi-8631d1fdd1b848d2be6f2096927d5ae9?pvs=4)
- [Figma](https://www.figma.com/design/5GnVktY7e8oYPlinkDVESt/Keychi?node-id=0-1&t=sdIXWoYCRInTmhF1-1)
- [System Architecture](https://drive.google.com/file/d/16kmKYs4FQ-kW8QHaTtWmcBEWbqANYkKi/view?usp=sharing)

## 📎 References

- [Photphor Iconify](https://icon-sets.iconify.design/)

---

**Created at**: 06-10-2024
