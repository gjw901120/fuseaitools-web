<template>
  <header class="app-header">
    <div class="simply-container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <img src="/favicon.ico" alt="Logo" class="logo-icon" />
            <span>SimplyAI</span>
          </NuxtLink>
        </div>

        <nav class="nav">
          <NuxtLink to="/home" class="nav-link">Home</NuxtLink>

          <NuxtLink to="/pricing" class="nav-link">Pricing</NuxtLink>
          <NuxtLink to="/news" class="nav-link">News</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>

        <div class="header-actions">
          <button class="btn-login">Log in</button>
          <button class="btn-signup">Sign up free</button>
        </div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <NuxtLink to="/home" class="mobile-nav-link" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/features" class="mobile-nav-link" @click="closeMobileMenu">Features</NuxtLink>
        <NuxtLink to="/pricing" class="mobile-nav-link" @click="closeMobileMenu">Pricing</NuxtLink>
        <NuxtLink to="/news" class="mobile-nav-link" @click="closeMobileMenu">News</NuxtLink>
        <NuxtLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</NuxtLink>
        <div class="mobile-actions">
          <button class="btn-login">Log in</button>
          <button class="btn-signup">Sign up free</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.nav {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  transition: color 0.3s ease;
  padding: 1rem 2.25rem;
  border: none;
  background: none;
  cursor: pointer;
}

.nav-link:hover {
  color: #667eea;
}

.dropdown-toggle {
  position: relative;
}

.dropdown-toggle i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-toggle:hover i {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  min-width: 800px;
  z-index: 1000;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-login, .btn-signup {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background: transparent;
  color: #4b5563;
}

.btn-login:hover {
  color: #667eea;
}

.btn-signup {
  background: #667eea;
  color: white;
}

.btn-signup:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #667eea;
}

.mobile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .nav, .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>