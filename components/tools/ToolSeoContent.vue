<template>
  <div
    :id="data.rootId"
    class="seo-content"
    :class="data.rootClass"
    itemscope
    itemtype="https://schema.org/SoftwareApplication"
    @click="onContentClick"
  >
    <meta itemprop="name" :content="data.meta.name" />
    <meta itemprop="applicationCategory" :content="data.meta.category || 'MultimediaApplication'" />
    <meta itemprop="operatingSystem" content="Web" />
    <meta itemprop="description" :content="data.meta.description" />

    <div v-if="data.badge" class="version-badge">{{ data.badge }}</div>

    <template v-for="(section, i) in visibleSections" :key="`${section.type}-${i}`">
      <!-- 按当前路由变化的引导段：{ title, lead }；无数据时回落到段内的静态 html -->
      <section
        v-if="section.type === 'intro' && (intro || section.html)"
        class="info-section workflow-intro"
        aria-labelledby="workflow-intro-heading"
      >
        <h2 id="workflow-intro-heading" class="section-title">{{ intro ? intro.title : section.title }}</h2>
        <p class="tool-sub" v-html="intro ? intro.lead : section.html" />
      </section>

      <!-- 按当前路由变化的定义段：{ title, body }；无数据时回落到段内的静态 html -->
      <section
        v-else-if="section.type === 'definition' && (definition || section.html)"
        class="info-section"
        aria-labelledby="definition-heading"
      >
        <h2 id="definition-heading" class="section-title">{{ definition ? definition.title : section.title }}</h2>
        <p class="tool-sub" v-html="definition ? definition.body : section.html" />
      </section>

      <!-- 固定段落 -->
      <section
        v-else-if="section.type === 'prose'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <p class="tool-sub" v-html="section.html" />
      </section>

      <!-- 特性卡片 -->
      <section
        v-else-if="section.type === 'features'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <div class="feature-grid">
          <div v-for="(f, fi) in section.items" :key="fi" class="feature-card">
            <div class="feature-icon" aria-hidden="true">{{ f.icon }}</div>
            <div class="feature-title">{{ f.title }}</div>
            <p v-html="f.description" />
          </div>
        </div>
      </section>

      <!-- 场景徽章 -->
      <section
        v-else-if="section.type === 'badges'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <div class="scenario-list">
          <span v-for="tag in section.items" :key="tag" class="scenario-badge">{{ tag }}</span>
        </div>
      </section>

      <!-- 表格：headers + rows（单元格支持 HTML） -->
      <section
        v-else-if="section.type === 'table'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <p v-if="section.lead" class="section-lead" v-html="section.lead" />
        <div class="compare-table-wrap">
          <table class="compare-table" :aria-label="section.ariaLabel || section.title">
            <thead>
              <tr>
                <th v-for="(h, hi) in section.headers" :key="hi">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in section.rows" :key="ri">
                <!-- 单元格可以是字符串，也可以是 { html, colspan }（与旧组件的 colspan 对齐） -->
                <td v-for="(cell, ci) in row" :key="ci" :colspan="cell && cell.colspan" v-html="cell && cell.html ? cell.html : cell" />
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="section.note" class="meta-note" v-html="section.note" />
      </section>

      <!-- FAQ：路由专属问题 + 公共问题 -->
      <section
        v-else-if="section.type === 'faq'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqItems"
            :key="index"
            class="faq-item"
            :class="{ open: openFaqIndex === index }"
          >
            <button
              type="button"
              class="faq-question"
              :aria-expanded="openFaqIndex === index"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-toggle" aria-hidden="true">{{ openFaqIndex === index ? '➖' : '➕' }}</span>
            </button>
            <div v-show="openFaqIndex === index" class="faq-answer"><div v-html="faq.answer" /></div>
          </div>
        </div>
      </section>

      <!-- 工作流跳转卡片 -->
      <section
        v-else-if="section.type === 'workflows'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <p v-if="section.lead" class="section-lead">{{ section.lead }}</p>
        <div class="model-modes-grid">
          <NuxtLink
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="model-mode-card"
            :class="{ 'model-mode-card--current': isCurrentMode(item.path) }"
            @click.prevent="handleModeClick(item.path)"
          >
            <div class="model-mode-icon" aria-hidden="true"><i :class="item.icon" /></div>
            <h3 class="model-mode-title">{{ item.title }}</h3>
            <p class="model-mode-name">{{ item.name }}</p>
            <p class="model-mode-desc">{{ item.description }}</p>
            <span class="model-mode-cta">{{ isCurrentMode(item.path) ? 'Current workflow' : 'Open this workflow →' }}</span>
          </NuxtLink>
        </div>
      </section>

      <!-- 兜底：个别工具的特有段落直接写 HTML -->
      <section
        v-else-if="section.type === 'html'"
        class="info-section"
        :aria-labelledby="section.id"
      >
        <h2 :id="section.id" class="section-title">{{ section.title }}</h2>
        <div v-html="section.html" />
      </section>
    </template>

    <div
      v-for="(tip, ti) in visibleTips"
      :key="`tip-${ti}`"
      class="upgrade-tip"
      :class="{ 'pricing-tip': tip.pricing }"
      v-html="tip.html"
    />
  </div>
</template>

<script setup>
/**
 * SEO 内容通用渲染器
 *
 * 每个工具只需在 data/seo/*.js 里描述元信息与 sections，模板结构由本组件统一维护，
 * 避免 47 份近乎相同的模板各写一遍（新增工具 = 新增一份数据）。
 */
const props = defineProps({
  data: { type: Object, required: true }
})

const route = useRoute()
const { navigateToToolTop, handleModeClick, watchRouteScroll } = useToolSeoPageScroll()

const currentPath = computed(() => route.path.replace(/\/$/, ''))

const intro = computed(() => props.data.introByPath?.[currentPath.value] || null)
const definition = computed(() => props.data.definitionByPath?.[currentPath.value] || null)
const faqItems = computed(() => [
  ...(props.data.faqByPath?.[currentPath.value] || []),
  ...(props.data.commonFaq || [])
])

/** sections / tips 都可以带 paths 数组，用于「仅在某几个路由显示」的段落 */
const onlyHere = (item) => !item.paths || item.paths.includes(currentPath.value)
const visibleSections = computed(() => (props.data.sections || []).filter(onlyHere))
const visibleTips = computed(() => (props.data.tips || []).filter(onlyHere))

useToolSeoFaqSchema(faqItems)

const openFaqIndex = ref(0)
function toggleFaq(index) {
  openFaqIndex.value = openFaqIndex.value === index ? -1 : index
}

function isCurrentMode(path) {
  return route.path === path || route.path === `${path}/`
}

/** v-html 里的工具内链没有 @click，用事件委托保持「页内切工具」的原有行为 */
function onContentClick(event) {
  const link = event.target?.closest?.('a.seo-inline-link[href^="/home/"]')
  if (!link) return
  event.preventDefault()
  navigateToToolTop(link.getAttribute('href'))
}

const scrollFilter = props.data.watchPathIncludes
if (scrollFilter) watchRouteScroll((path) => path.includes(scrollFilter))
</script>
