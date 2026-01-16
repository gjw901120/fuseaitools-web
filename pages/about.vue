<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="simply-container">
        <div class="hero-content">
          <h1 class="hero-title">About Fuse AI Tools</h1>
          <p class="hero-subtitle">
            A platform that collects various practical AI tools, committed to providing users with the best AI tool experience.
          </p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="simply-container">
        <div class="content-wrapper">
          <h2>Our Mission</h2>
          <p>Fuse AI Tools is committed to providing users with the most comprehensive and practical AI tool collection, enabling everyone to easily use artificial intelligence technology to improve work efficiency and creativity.</p>
          
          <h2>Why Choose Us</h2>
          <ul>
            <li>Curated high-quality AI tools, rigorously screened</li>
            <li>Continuous updates, keeping up with AI technology developments</li>
            <li>Detailed usage guides and tutorials</li>
            <li>User-friendly interface design</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.hero-section {
  padding: 60px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.breadcrumb {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home-link {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  backdrop-filter: blur(10px);
}

.home-link:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  line-height: 1.6;
}

.content-section {
  padding: 80px 0;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.content-wrapper h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #333;
}

.content-wrapper p {
  margin-bottom: 1.5rem;
  color: #666;
}

.content-wrapper ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.content-wrapper li {
  margin-bottom: 0.5rem;
  color: #666;
}

.simply-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>