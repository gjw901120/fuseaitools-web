<template>
  <HomeLayout>
    <div class="tool-overview content-padding">
      <header class="overview-header">
        <span v-if="config.showCategory !== false" class="overview-category">{{ config.category }}</span>
        <h1 class="overview-title">{{ config.title }}</h1>
        <p class="overview-intro" :class="{ 'intro-full-width': config.introFullWidth }">{{ config.intro }}</p>
      </header>

      <section class="overview-features">
        <h2 class="features-heading">
          <i class="fas fa-th-large features-heading-icon"></i>
          Features
        </h2>
        <div class="features-grid">
          <NuxtLink
            v-for="feature in config.features"
            :key="feature.path"
            :to="feature.path"
            class="feature-card-link"
          >
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-arrow-right"></i>
              </div>
              <h3 class="feature-title">{{ feature.name }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              <span class="feature-cta">Use this feature →</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <template v-if="config.sections && config.sections.length">
        <div class="sections-wrapper">
          <section
            v-for="(section, idx) in config.sections"
            :key="idx"
            class="overview-section"
          >
            <h2 class="section-title">{{ section.title }}</h2>
            <div class="section-content">
              <p
                v-for="(para, i) in sectionParagraphs(section.content)"
                :key="i"
                class="section-para"
              >
                {{ para }}
              </p>
            </div>
          </section>
        </div>
      </template>
    </div>
  </HomeLayout>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true,
    validator: (c) => c.title && Array.isArray(c.features)
  }
})
const route = useRoute()
const baseUrl = 'https://fuseaitools.com'
const canonicalUrl = `${baseUrl}${route.path}`.replace(/\/$/, '') || baseUrl

function sectionParagraphs(content) {
  if (!content || typeof content !== 'string') return []
  return content.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
}

useHead({
  title: `${props.config.title} - AI Tools | FuseAITools`,
  meta: [
    { name: 'description', content: props.config.intro }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})
</script>

<style scoped>
.tool-overview {
  padding-top: 2rem;
  padding-bottom: 4rem;
  max-width: var(--content-max-width, 1200px);
  margin: 0 auto;
}

.overview-header {
  margin-bottom: 2.75rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.overview-category {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6366f1;
  margin-bottom: 0.75rem;
}

.overview-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1.25rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.overview-intro {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #4b5563;
  margin: 0;
  max-width: none;
}

.overview-intro.intro-full-width {
  font-size: 1.1875rem;
  line-height: 1.8;
  color: #374151;
}

/* Features block */
.overview-features {
  margin-top: 2.5rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.features-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem;
}

.features-heading-icon {
  color: #6366f1;
  font-size: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.feature-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.5rem;
  height: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.feature-card-link:hover .feature-card {
  border-color: #6366f1;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
  transform: translateY(-2px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem;
}

.feature-description {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #6b7280;
  margin: 0 0 0.75rem;
}

.feature-cta {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
}

.feature-card-link:hover .feature-cta {
  text-decoration: underline;
}

/* Long-form sections */
.sections-wrapper {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.overview-section {
  padding: 1.75rem 2rem;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6366f1;
  display: inline-block;
}

.section-content {
  color: #4b5563;
  line-height: 1.75;
}

.section-para {
  margin: 0 0 1rem;
  font-size: 1rem;
}

.section-para:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .tool-overview { padding-top: 1.5rem; padding-bottom: 2.5rem; }
  .overview-header { padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .overview-title { font-size: 1.75rem; }
  .overview-intro { font-size: 1rem; }
  .overview-intro.intro-full-width { font-size: 1.0625rem; }
  .overview-features { padding: 1.5rem; margin-top: 2rem; }
  .features-grid { grid-template-columns: 1fr; }
  .overview-section { padding: 1.25rem 1.5rem; }
}
</style>
