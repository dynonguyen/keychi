<div align="center" >
	<img src="../.docs/img/api-cover.jpg" height="256" />
</div>

# Keychi API

## 🛠️ Project Structure

```bash
project-name/
│
├── cmd/                    # Entry point của ứng dụng
│   └── server/
│       └── main.go         # Chạy ứng dụng (khởi tạo server và dependency injection)
│
├── internal/               # Chứa mã nguồn chính, không public ra ngoài
│   ├── domain/             # Chứa các entities, business logic, và interfaces (contracts)
│   │   ├── entity/         # Các đối tượng nghiệp vụ (Entities)
│   │   │   └── user.go
│   │   ├── repository/     # Interface của các repository
│   │   │   └── user_repository.go
│   │   └── service/        # Business logic (use cases)
│   │       └── user_service.go
│   │
│   ├── repository/         # Chứa các implementation của repository (DAO - Data Access Object)
│   │   ├── user_repo_pg.go # Repository cho PostgreSQL
│   │   └── user_repo_mock.go # Repository mock (cho test)
│   │
│   ├── usecase/            # Use cases chính của hệ thống
│   │   └── user_usecase.go
│   │
│   ├── handler/           # Chứa các HTTP handlers, gRPC handlers, hoặc message brokers
│   │   ├── http/
│   │   │   ├── user_handler.go
│   │   │   └── router.go   # Cấu hình router và routes
│   │   └── middleware/     # Các middleware cho HTTP (e.g., auth, logging)
│   │       └── auth.go
│   │
│   └── config/             # Chứa các cấu hình của ứng dụng (database, env)
│       └── config.go
│
├── pkg/                    # Các thư viện tiện ích có thể tái sử dụng
│   └── logger/
│       └── logger.go       # Ví dụ: package logging
│
├── .env                    # File cấu hình môi trường
├── go.mod                  # File khai báo module Go
├── go.sum                  # File khai báo dependencies
```
