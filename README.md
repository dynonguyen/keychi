<div align="center"><img src="./.docs/img/cover.jpg" height="256" /></div>

# ✳️ Keychi

> Keychi is the best password manager for securely storing, managing data such as passwords, passkeys, OTP and credit cards.

## 🚀 Getting Started

### Installation

```bash
chmod +x ./scripts/*.sh

./scripts/install.sh
```

### Development

- Start all services

```bash
./scripts/startup.sh
```

- Start individual services

```bash
# Start supabase
cd ./docker/supabase
docker compose up -d

# Start keychi api server

# Start keychi web app

# Start keychi mobile app

# Start keychi desktop app
```

### Accessing resources

- Supabase dashboard: http://localhost:8000
- Postgres server: http://localhost:5432
- Keychi web: http://localhost:8888

## 🐥 Documentation

- [Notion](https://www.notion.so/dynonguyen/Keychi-8631d1fdd1b848d2be6f2096927d5ae9?pvs=4)

## 📎 References

- [Supabase](https://supabase.com/)
