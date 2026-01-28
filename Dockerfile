# 使用官方 Node.js 20 LTS 作为基础镜像
FROM node:20-alpine AS base

# 安装必要的依赖
RUN apk add --no-cache libc6-compat wget
WORKDIR /app

# 依赖安装阶段
FROM base AS deps
# 复制 package 文件
COPY package.json package-lock.json* ./
# 安装依赖
# 注意：npm 警告（如 deprecated）来自间接依赖，不影响功能
RUN npm ci

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
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/public ./public
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# 切换到非 root 用户
USER nuxtjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]
