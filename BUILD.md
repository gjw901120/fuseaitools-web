# 构建说明

## 问题说明

直接 `docker pull node:20-alpine` 可以成功，但 `docker-compose build` 时拉取失败，提示授权问题。

**原因：** Docker Compose 默认使用 BuildKit，BuildKit 在构建时使用的认证上下文可能与直接 pull 不同。

## 解决方案

### 方案 1：使用构建脚本（推荐）

**Windows:**
```bash
build.bat
```

**Linux/Mac:**
```bash
chmod +x build.sh
./build.sh
```

脚本会自动禁用 BuildKit，使用传统构建器。

### 方案 2：手动设置环境变量

**Windows:**
```bash
set DOCKER_BUILDKIT=0
set COMPOSE_DOCKER_CLI_BUILD=0
docker-compose build
```

**Linux/Mac:**
```bash
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0
docker-compose build
```

### 方案 3：在 docker-compose.yml 中已配置

`docker-compose.yml` 中已设置 `pull: true`，会强制拉取镜像。

如果仍有问题，使用方案 1 或 2。

## 生产环境

在生产环境 CI/CD 中，可以这样配置：

```yaml
# GitHub Actions 示例
- name: Build with Docker Compose
  env:
    DOCKER_BUILDKIT: 0
    COMPOSE_DOCKER_CLI_BUILD: 0
  run: docker-compose build
```

或者直接使用构建脚本。

## 验证

构建完成后，验证镜像：

```bash
docker images | grep fuseaitools
docker-compose up -d
docker-compose ps
```
