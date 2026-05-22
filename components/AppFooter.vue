<template>
  <footer class="app-footer" :class="{ 'app-footer--flux': isFluxThemeRoute }">
    <div class="simply-container">
      <div class="footer-content">
        <!-- 左侧品牌区 -->
        <div class="footer-brand">
          <div class="logo">
            <i class="fas fa-robot" aria-hidden="true"></i>
            <span>FuseAI</span>
          </div>
          <p class="company-description">
            {{ footerBrand.description }}
          </p>
          <p class="company-description-secondary">
            {{ footerBrand.descriptionSecondary }}
          </p>
          <a class="footer-email" :href="`mailto:${footerBrand.email}`">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            {{ footerBrand.email }}
          </a>
        </div>

        <!-- 工具导航列 -->
        <div
          v-for="col in footerNavColumns"
          :key="col.title"
          class="footer-col"
        >
          <h4 class="footer-col-title">{{ col.title }}</h4>
          <ul class="footer-col-links">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink :to="link.to" class="footer-nav-link">
                {{ link.label }}
                <span v-if="link.badge" class="footer-link-badge">{{ link.badge }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; 2026 Fuse Tech . LTD. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { footerNavColumns, footerBrand } from '~/constants/footerNav'

const { isFluxThemeRoute } = useFluxThemeRoute()
</script>

<style scoped>
.app-footer {
  background: #f8fafc;
  color: #374151;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: minmax(200px, 1.2fr) repeat(4, 1fr);
  gap: 32px 24px;
  margin-bottom: 40px;
  align-items: start;
}

.footer-brand {
  min-width: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: hsl(173, 80%, 40%);
  margin-bottom: 1rem;
}

.logo i {
  font-size: 1.8rem;
}

.company-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  max-width: 280px;
}

.company-description-secondary {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1rem;
  font-size: 0.875rem;
  max-width: 280px;
  opacity: 0.9;
}

.footer-email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-email:hover {
  color: hsl(173, 80%, 40%);
}

.footer-col {
  min-width: 0;
}

.footer-col-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
  margin: 0 0 1rem;
}

.footer-col-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-col-links li {
  margin: 0;
  padding: 0;
}

.footer-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.8;
  transition: color 0.2s ease;
}

.footer-nav-link:hover {
  color: hsl(173, 80%, 40%);
}

.footer-link-badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: hsl(173, 80%, 40%);
  background: hsla(173, 80%, 40%, 0.15);
  border-radius: 4px;
  vertical-align: middle;
}

.footer-bottom {
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright p {
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
}

/* FLUX 深色主题 */
.app-footer--flux {
  background: var(--flux-bg) !important;
  color: var(--flux-muted) !important;
  border-top: 1px solid var(--flux-border-subtle);
}

.app-footer--flux .logo {
  color: var(--flux-primary) !important;
}

.app-footer--flux .company-description,
.app-footer--flux .company-description-secondary,
.app-footer--flux .footer-email,
.app-footer--flux .copyright p {
  color: var(--flux-muted) !important;
}

.app-footer--flux .footer-email:hover,
.app-footer--flux .footer-nav-link:hover {
  color: var(--flux-primary) !important;
}

.app-footer--flux .footer-col-title {
  color: var(--flux-muted) !important;
  opacity: 0.85;
}

.app-footer--flux .footer-nav-link {
  color: var(--flux-muted) !important;
}

.app-footer--flux .footer-link-badge {
  color: var(--flux-primary) !important;
  background: var(--flux-primary-muted) !important;
}

.app-footer--flux .footer-bottom {
  border-top-color: var(--flux-border) !important;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-brand {
    grid-column: 1 / -1;
    max-width: 100%;
  }

  .company-description {
    max-width: 480px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 20px;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
