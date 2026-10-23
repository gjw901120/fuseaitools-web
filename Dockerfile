# Node 24 LTS：Node 20 已 EOL，且 eslint-plugin-jsdoc / jsdoc-type-pratt-parser 要求 >=24.15
FROM node:24-alpine AS base

# 安装必要的依赖
RUN apk add --no-cache libc6-compat wget
# 关闭 npm 升级提示（构建日志噪音）
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
WORKDIR /app

# 依赖安装阶段
FROM base AS deps
# 复制 package 文件
COPY package.json package-lock.json* ./
# 安装依赖
# --no-audit/--no-fund：audit 报告只覆盖 devDependencies（生产依赖 0 漏洞），
# 且全部不进运行镜像；loglevel=error 屏蔽间接依赖的 engine/deprecation 噪音，
# 真正的安装失败仍以 error 输出。
RUN npm ci --no-audit --no-fund --loglevel=error

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量
ENV NODE_ENV=production
# 使用 node-server preset 以便在容器中运行
ENV NITRO_PRESET=node-server

# 构建应用
RUN npm run build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# 复制构建产物和必要文件
# 注意：需要保持 .output 目录结构
# .output/public 已包含 public/ 的全部静态资源，无需重复复制（省 ~16MB）
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# 切换到非 root 用户
USER nuxtjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]
