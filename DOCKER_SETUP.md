# Docker 部署说明

## 镜像拉取问题解决方案

如果遇到 `429 Too Many Requests` 或镜像拉取缓慢的问题，可以使用以下方法：

### 方法 1：配置 Docker 镜像加速器（推荐）

#### Windows Docker Desktop
1. 打开 Docker Desktop
2. 点击设置（Settings）
3. 选择 Docker Engine
4. 在 JSON 配置中添加以下镜像加速器：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

5. 点击 "Apply & Restart" 重启 Docker

#### Linux
编辑 `/etc/docker/daemon.json`（如果不存在则创建）：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

然后重启 Docker 服务：
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 方法 2：修改 Dockerfile 使用国内镜像源

如果方法 1 不可用，可以修改 `Dockerfile` 第一行，使用国内镜像源：

```dockerfile
# 使用阿里云镜像
FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base

# 或使用腾讯云镜像
# FROM ccr.ccs.tencentyun.com/library/node:18-alpine AS base

# 或使用上海交大镜像
# FROM docker.mirrors.sjtug.sjtu.edu.cn/library/node:18-alpine AS base
```

## 使用方法

### 构建并启动服务
```bash
docker-compose up -d --build
```

### 查看日志
```bash
docker-compose logs -f
```

### 停止服务
```bash
docker-compose down
```

### 重新构建
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 访问应用

启动成功后，访问：http://localhost:3000

## 环境变量配置

在 `docker-compose.yml` 中可以配置以下环境变量：

- `NUXT_PUBLIC_API_BASE`: API 基础路径
- `NODE_ENV`: 环境模式（production/development）
- `PORT`: 服务端口（默认 3000）
