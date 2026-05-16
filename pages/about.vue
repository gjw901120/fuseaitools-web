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
          
          <h2>Contact Us</h2>
          <div class="contact-section">
            <p class="contact-intro">
              We're here to help! If you have any questions, need assistance, or want to share your feedback, please don't hesitate to reach out to us.
            </p>
            
            <div class="contact-cards">
              <div class="contact-card">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <h3>Customer Service</h3>
                <p class="contact-description">
                  For technical support, account issues, billing questions, or any problems you encounter while using our platform.
                </p>
                <a href="mailto:service@fuseaitools.com" class="contact-email">
                  service@fuseaitools.com
                </a>
              </div>
              
              <div class="contact-card">
                <div class="contact-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <h3>Feedback & Suggestions</h3>
                <p class="contact-description">
                  Share your ideas, feature requests, or suggestions to help us improve and enhance your experience on Fuse AI Tools.
                </p>
                <a href="mailto:support@fuseaitools.com" class="contact-email">
                  support@fuseaitools.com
                </a>
              </div>
            </div>
            
            <div class="contact-commitment">
              <div class="commitment-icon">
                <i class="fas fa-clock"></i>
              </div>
              <p class="commitment-text">
                We are committed to responding to your inquiries and questions within 12 hours, and we will work diligently to provide you with satisfactory answers or solutions as quickly as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.hero-section {
  padding: 60px 0 40px;
  text-align: center;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -20%, hsla(173, 80%, 40%, 0.14), transparent),
    radial-gradient(ellipse 60% 40% at 100% 50%, hsla(200, 90%, 42%, 0.1), transparent),
    linear-gradient(180deg, hsl(215, 25%, 11%) 0%, hsl(220, 14%, 5%) 100%);
  color: var(--flux-foreground, hsl(0, 0%, 98%));
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
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.hero-subtitle {
  font-size: 1.125rem;
  color: hsla(0, 0%, 98%, 0.85);
  line-height: 1.6;
}

.content-section {
  padding: 80px 0;
  background: var(--flux-bg, hsl(220, 14%, 5%));
  background-image:
    radial-gradient(ellipse 70% 55% at 50% 0%, hsla(173, 80%, 40%, 0.08), transparent),
    radial-gradient(ellipse 55% 45% at 100% 80%, hsla(200, 90%, 42%, 0.06), transparent);
  border-top: 1px solid var(--flux-border-subtle, hsla(215, 16%, 32%, 0.5));
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
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.content-wrapper p {
  margin-bottom: 1.5rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

.content-wrapper ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.content-wrapper li {
  margin-bottom: 0.5rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
}

/* Contact Section */
.contact-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--flux-border, hsl(215, 16%, 22%));
}

.contact-intro {
  margin-bottom: 2rem;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  font-size: 1rem;
  line-height: 1.7;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-card {
  background: var(--flux-card, hsl(215, 25%, 14%));
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--flux-primary-glow, hsla(173, 80%, 40%, 0.2));
  border-color: var(--flux-primary, hsl(173, 80%, 40%));
}

.contact-icon {
  width: 56px;
  height: 56px;
  background: var(--flux-gradient, linear-gradient(135deg, hsl(173, 80%, 42%) 0%, hsl(200, 90%, 42%) 100%));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.contact-icon i {
  font-size: 1.5rem;
  color: white;
}

.contact-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
}

.contact-description {
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--flux-primary, hsl(173, 80%, 40%));
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  padding: 0.5rem 0;
}

.contact-email:hover {
  color: var(--flux-primary-hover, hsl(173, 80%, 48%));
  gap: 0.75rem;
}

.contact-email::before {
  content: '→';
  transition: transform 0.2s ease;
}

.contact-email:hover::before {
  transform: translateX(4px);
}

.contact-commitment {
  margin-top: 3rem;
  padding: 1.5rem;
  background: var(--flux-primary-muted, hsla(173, 80%, 40%, 0.12));
  border-left: 4px solid var(--flux-primary, hsl(173, 80%, 40%));
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.commitment-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--flux-gradient, linear-gradient(135deg, hsl(173, 80%, 42%) 0%, hsl(200, 90%, 42%) 100%));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.commitment-icon i {
  color: white;
  font-size: 1.125rem;
}

.commitment-text {
  margin: 0;
  color: var(--flux-muted, hsl(215, 12%, 62%));
  line-height: 1.7;
  font-size: 0.9375rem;
  flex: 1;
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
  
  .contact-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .contact-card {
    padding: 1.5rem;
  }
  
  .contact-icon {
    width: 48px;
    height: 48px;
  }
  
  .contact-icon i {
    font-size: 1.25rem;
  }
  
  .contact-commitment {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .commitment-icon {
    width: 36px;
    height: 36px;
  }
  
  .commitment-icon i {
    font-size: 1rem;
  }
}
</style>