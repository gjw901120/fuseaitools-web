<template>
  <section class="image-gallery">
    <div class="simply-container">
      <div class="gallery-header">
        <h2 class="gallery-title">Product Showcase</h2>
        <p class="gallery-description">Explore our AI tools and features</p>
      </div>
      
      <div class="gallery-categories">
        <!-- Category Tabs Row -->
        <div class="category-tabs-row">
          <div class="category-tab">Chat</div>
          <div class="category-tab">Image</div>
          <div class="category-tab">Audio</div>
          <div class="category-tab">Video</div>
        </div>

        <!-- Category Content Grid -->
        <div class="category-content-grid">
          <!-- Chat Column -->
          <div class="category-column">
            <div class="category-row">
              <NuxtLink :to="item.route" class="gallery-item" v-for="item in chatModels" :key="item.title" @click="scrollToTop">
                <div class="logo-card">
                  <div class="logo-wrapper">
                    <img :src="item.logo" :alt="item.title" class="model-logo" />
                  </div>
                  <h3 class="model-title">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Image Column -->
          <div class="category-column">
            <div class="category-row">
              <NuxtLink :to="item.route" class="gallery-item" v-for="item in imageModels" :key="item.title" @click="scrollToTop">
                <div class="logo-card">
                  <div class="logo-wrapper">
                    <img :src="item.logo" :alt="item.title" class="model-logo" />
                  </div>
                  <h3 class="model-title">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Audio Column -->
          <div class="category-column">
            <div class="category-row">
              <NuxtLink :to="item.route" class="gallery-item" v-for="item in audioModels" :key="item.title" @click="scrollToTop">
                <div class="logo-card">
                  <div class="logo-wrapper">
                    <img :src="item.logo" :alt="item.title" class="model-logo" />
                  </div>
                  <h3 class="model-title">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Video Column -->
          <div class="category-column">
            <div class="category-row">
              <NuxtLink :to="item.route" class="gallery-item" v-for="item in videoModels" :key="item.title" @click="scrollToTop">
                <div class="logo-card">
                  <div class="logo-wrapper">
                    <img :src="item.logo" :alt="item.title" class="model-logo" />
                  </div>
                  <h3 class="model-title">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
const scrollToTop = () => {
  // 立即滚动到顶部
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  })
  
  // 使用 nextTick 确保在 DOM 更新后滚动
  nextTick(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }, 50)
  })
}

const chatModels = ref([
  {
    title: 'GPT',
    logo: '/tools-logo/ChatGpt.png',
    route: '/home/gpt'
  },
  {
    title: 'Deepseek',
    logo: '/tools-logo/Deepseek.png',
    route: '/home/deepseek'
  },
  {
    title: 'Claude',
    logo: '/tools-logo/Claude.png',
    route: '/home/claude'
  },
  {
    title: 'Gemini',
    logo: '/tools-logo/Gemini.png',
    route: '/home/gemini'
  }
])

const imageModels = ref([
  {
    title: 'Midjourney',
    logo: '/tools-logo/Midjourney.png',
    route: '/home/midjourney'
  },
  {
    title: 'GPT 4o Image',
    logo: '/tools-logo/ChatGpt.png',
    route: '/home/gpt-4o-image'
  },
  {
    title: 'Flux Kontext',
    logo: '/tools-logo/FluxKontext.png',
    route: '/home/flux-kontext'
  },
  {
    title: 'Nano Banana',
    logo: '/tools-logo/NanoBanana.png',
    route: '/home/nano-banana'
  }
])

const audioModels = ref([
  {
    title: 'Suno',
    logo: '/tools-logo/suno.png',
    route: '/home/suno'
  },
  {
    title: 'Elevenlabs',
    logo: '/tools-logo/Elevenlabs.png',
    route: '/home/elevenlabs'
  }
])

const videoModels = ref([
  {
    title: 'Veo3',
    logo: '/tools-logo/Veo.png',
    route: '/home/veo3'
  },
  {
    title: 'Runway',
    logo: '/tools-logo/Runway.png',
    route: '/home/runway'
  },
  {
    title: 'Luma',
    logo: '/tools-logo/Luma.png',
    route: '/home/luma'
  },
  {
    title: 'Sora',
    logo: '/tools-logo/sora.png',
    route: '/home/sora'
  }
])
</script>

<style scoped>
.image-gallery {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.gallery-description {
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.gallery-categories {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.category-tabs-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.category-tab {
  display: inline-block;
  padding: 10px 32px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: capitalize;
  flex: 1;
  min-width: 120px;
  text-align: center;
}

.category-content-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  align-items: start;
}

.category-column {
  display: flex;
  flex-direction: column;
}

.category-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 100%;
  text-decoration: none;
  display: block;
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.logo-card {
  background: white;
  padding: 30px 20px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.logo-wrapper {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
}

.model-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.model-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}


@media (max-width: 768px) {
  .category-tabs-row {
    gap: 10px;
  }

  .category-tab {
    padding: 8px 16px;
    font-size: 0.9rem;
    min-width: 80px;
  }

  .category-content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .category-row {
    gap: 20px;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .gallery-item {
    width: 100%;
    max-width: 100%;
  }
}
</style>
