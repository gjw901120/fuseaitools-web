# Docker 部署指南

## 快速开始

### Windows（推荐）
```bash
# 一键构建并启动
up.bat

# 或分步执行
build.bat
docker-compose up -d
```

### Linux/Mac（推荐）
```bash
# 一键构建并启动
chmod +x up.sh
./up.sh

# 或分步执行
chmod +x build.sh
./build.sh
docker-compose up -d
```

**重要：** 不要直接使用 `docker-compose up -d --build`，因为构建时无法拉取镜像。请使用提供的脚本。

## 问题解决

### 构建时镜像拉取失败

**问题：** `docker pull node:20-alpine` 可以成功，但 `docker-compose build` 时失败。

**原因：** Docker Compose 默认使用 BuildKit，BuildKit 在构建时使用的认证上下文可能与直接 pull 不同。

**解决方案：** 使用提供的构建脚本，脚本会自动禁用 BuildKit。

### 手动构建（如果脚本不可用）

**Windows:**
```bash
set DOCKER_BUILDKIT=0
set COMPOSE_DOCKER_CLI_BUILD=0
docker-compose build
docker-compose up -d
```

**Linux/Mac:**
```bash
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0
docker-compose build
docker-compose up -d
```

## 常用命令

```bash
# 构建
docker-compose build

# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down

# 重启
docker-compose restart

# 查看状态
docker-compose ps
```

## 生产环境

在生产环境或 CI/CD 中，确保设置环境变量：

```bash
DOCKER_BUILDKIT=0 COMPOSE_DOCKER_CLI_BUILD=0 docker-compose build
DOCKER_BUILDKIT=0 COMPOSE_DOCKER_CLI_BUILD=0 docker-compose up -d
```

或直接使用构建脚本。
