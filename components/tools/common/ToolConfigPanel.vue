<template>
  <div class="tool-config-panel">
    <div class="tool-panel-header tool-config-panel__header">
      <h4 class="panel-title">{{ title }}</h4>
      <div v-if="$slots.actions" class="tool-panel-header__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="tool-panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
/**
 * 工具页左侧「配置面板」壳（解耦标准件）。
 * - 统一 header：panel-title + 可选 actions 插槽
 * - 统一卡片外观走 flux 令牌，禁止各工具再复制粘贴 300~600 行 scoped 样式
 * - 新增模型/工具页必须使用；旧工具改版时顺手迁移
 *
 * 用法：
 *   <ToolConfigPanel title="Configuration"> ... 表单 ... </ToolConfigPanel>
 */
defineProps({
  title: { type: String, default: 'Configuration' },
})
</script>

<style scoped>
.tool-config-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--flux-card);
  border: 1px solid var(--flux-border);
  border-radius: 12px;
  padding: 20px;
}

.tool-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--flux-border);
}

.tool-panel-header .panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--flux-foreground);
}

.tool-panel-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-panel-body {
  min-width: 0;
}
</style>
