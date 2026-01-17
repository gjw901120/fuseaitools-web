@echo off
REM 构建脚本 - 解决构建时镜像拉取问题 (Windows)
REM 先手动拉取镜像，然后禁用 BuildKit 构建

echo 🔨 开始构建流程...

REM 步骤 1: 先手动拉取基础镜像（避免构建时拉取失败）
echo 📥 拉取基础镜像 node:20-alpine...
docker pull node:20-alpine
if %errorlevel% neq 0 (
    echo ❌ 镜像拉取失败，请检查网络连接
    exit /b 1
)

REM 步骤 2: 禁用 BuildKit 使用传统构建器
echo 🔧 配置构建环境（禁用 BuildKit）...
set DOCKER_BUILDKIT=0
set COMPOSE_DOCKER_CLI_BUILD=0

REM 步骤 3: 构建镜像（使用本地已拉取的镜像）
echo 📦 正在构建应用镜像...
docker-compose build --pull=false

if %errorlevel% neq 0 (
    echo ❌ 构建失败
    exit /b 1
)

echo ✅ 构建完成！
echo 🚀 启动服务: docker-compose up -d
