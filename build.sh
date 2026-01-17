#!/bin/bash
# 构建脚本 - 解决构建时镜像拉取问题
# 先手动拉取镜像，然后禁用 BuildKit 构建

set -e

echo "🔨 开始构建流程..."

# 步骤 1: 先手动拉取基础镜像（避免构建时拉取失败）
echo "📥 拉取基础镜像 node:20-alpine..."
docker pull node:20-alpine || {
    echo "❌ 镜像拉取失败，请检查网络连接"
    exit 1
}

# 步骤 2: 禁用 BuildKit 使用传统构建器
echo "🔧 配置构建环境（禁用 BuildKit）..."
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0

# 步骤 3: 构建镜像（使用本地已拉取的镜像）
echo "📦 正在构建应用镜像..."
docker-compose build --pull=false || {
    echo "❌ 构建失败"
    exit 1
}

echo "✅ 构建完成！"
echo "🚀 启动服务: docker-compose up -d"
