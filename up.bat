@echo off
REM 一键启动脚本 - 构建并启动服务 (Windows)

echo 🚀 开始部署流程...

REM 先运行构建脚本
call build.bat
if %errorlevel% neq 0 (
    echo ❌ 构建失败，无法启动服务
    exit /b 1
)

REM 启动服务
echo 🚀 启动服务...
docker-compose up -d

if %errorlevel% equ 0 (
    echo ✅ 部署完成！
    echo 📊 查看服务状态: docker-compose ps
    echo 📝 查看日志: docker-compose logs -f
) else (
    echo ❌ 启动失败
    exit /b 1
)
