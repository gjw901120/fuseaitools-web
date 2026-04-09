#!/bin/bash
# 一键启动脚本 - 构建并启动服务 (Linux/Mac)
# 自动构建 Docker 镜像并启动容器

set -e

echo "🚀 开始部署流程..."

# 兼容 docker compose v2 和 docker-compose v1
if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
else
    echo "❌ 未找到 Docker Compose（docker compose / docker-compose）"
    exit 1
fi

# 检查 build.sh 是否存在
if [ ! -f "./build.sh" ]; then
    echo "❌ 错误: build.sh 文件不存在"
    exit 1
fi

# 确保 build.sh 有执行权限
chmod +x ./build.sh

# 先运行构建脚本
echo "📦 执行构建..."
./build.sh || {
    echo "❌ 构建失败，无法启动服务"
    exit 1
}

# 启动服务
echo ""
echo "🚀 启动服务..."
$COMPOSE_CMD up -d || {
    echo "❌ 启动失败"
    exit 1
}

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 3

# 检查服务状态
echo ""
echo "📊 服务状态:"
$COMPOSE_CMD ps

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 常用命令:"
echo "  查看日志: $COMPOSE_CMD logs -f"
echo "  停止服务: $COMPOSE_CMD down"
echo "  重启服务: $COMPOSE_CMD restart"
echo "  查看状态: $COMPOSE_CMD ps"
echo ""
echo "🌐 访问地址: http://localhost:3000"
