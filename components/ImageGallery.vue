<template>
  <section class="image-gallery">
    <div class="simply-container">
      <div class="gallery-header">
        <h2 class="gallery-title">Product Showcase</h2>
        <p class="gallery-description">Explore our AI tools and features</p>
      </div>
      
      <div class="gallery-categories">
        <div class="categories-list">
          <!-- Chat Row -->
          <div class="category-row-item">
            <div class="category-label chat-label">Chat</div>
            <div class="category-items">
              <article v-for="item in chatModels" :key="item.title">
                <NuxtLink :to="item.route" class="gallery-item" @click="scrollToTop">
                  <div class="logo-card">
                    <div class="logo-wrapper">
                      <img :src="item.logo" :alt="item.title" class="model-logo" />
                    </div>
                    <h3 class="model-title">{{ item.title }}</h3>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>

          <!-- Image Row -->
          <div class="category-row-item">
            <div class="category-label image-label">Image</div>
            <div class="category-items">
              <article v-for="item in imageModels" :key="item.title">
                <NuxtLink :to="item.route" class="gallery-item" @click="scrollToTop">
                  <div class="logo-card">
                    <div class="logo-wrapper">
                      <img :src="item.logo" :alt="item.title" class="model-logo" />
                    </div>
                    <h3 class="model-title">{{ item.title }}</h3>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>

          <!-- Audio Row -->
          <div class="category-row-item">
            <div class="category-label audio-label">Audio</div>
            <div class="category-items">
              <article v-for="item in audioModels" :key="item.title">
                <NuxtLink :to="item.route" class="gallery-item" @click="scrollToTop">
                  <div class="logo-card">
                    <div class="logo-wrapper">
                      <img :src="item.logo" :alt="item.title" class="model-logo" />
                    </div>
                    <h3 class="model-title">{{ item.title }}</h3>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>

          <!-- Video Row -->
          <div class="category-row-item">
            <div class="category-label video-label">Video</div>
            <div class="category-items">
              <article v-for="item in videoModels" :key="item.title">
                <NuxtLink :to="item.route" class="gallery-item" @click="scrollToTop">
                  <div class="logo-card">
                    <div class="logo-wrapper">
                      <img :src="item.logo" :alt="item.title" class="model-logo" />
                    </div>
                    <h3 class="model-title">{{ item.title }}</h3>
                  </div>
                </NuxtLink>
              </article>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
const scrollToTop = () => {
  // 在路由跳转后滚动到顶部
  // 使用 setTimeout 确保在路由跳转完成后执行
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, 100)
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
  gap: 21px; /* 30px * 0.7 */
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-row-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.category-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17.28px 28.8px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 11.52px;
  font-size: 1.296rem;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  min-width: 144px;
  flex-shrink: 0;
  min-height: 115.2px;
  box-sizing: border-box;
}

.chat-label {
  background: #dbeafe; /* 蓝色 */
  color: #1e40af;
  border-left: 4px solid #3b82f6;
}

.image-label {
  background: #fef3c7; /* 黄色 */
  color: #92400e;
  border-left: 4px solid #f59e0b;
}

.audio-label {
  background: #fce7f3; /* 粉色 */
  color: #9f1239;
  border-left: 4px solid #ec4899;
}

.video-label {
  background: #d1fae5; /* 绿色 */
  color: #065f46;
  border-left: 4px solid #10b981;
}

.category-items {
  display: flex;
  flex-direction: row;
  gap: 20px; /* 间隔加大2倍：10px * 2 */
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
}

.category-items article {
  display: flex;
  margin: 0;
  padding: 0;
}

.gallery-item {
  position: relative;
  border-radius: 11.52px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* 淡化阴影，增强融合度 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 172.8px; /* 固定宽度，再放大20% */
  height: 115.2px; /* 固定高度，再放大20% */
  flex: 0 0 172.8px; /* 固定大小，不伸缩，再放大20% */
  text-decoration: none;
  display: block;
  cursor: pointer; /* 确保鼠标指针显示为手型 */
  pointer-events: auto; /* 确保可以点击 */
}

.gallery-item:hover {
  transform: translateY(-4px); /* 减小悬停时的移动距离 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12); /* 淡化悬停阴影 */
}

.logo-card {
  background: rgba(255, 255, 255, 0.6); /* 淡化白色背景，增加透明度 */
  backdrop-filter: blur(10px); /* 添加毛玻璃效果，增强融合度 */
  padding: 8px 6px; /* 压缩内边距以适应固定尺寸 */
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.15); /* 淡化边框 */
}

.logo-wrapper {
  width: 40px; /* 缩小 logo 大小 */
  height: 40px; /* 缩小 logo 大小 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px; /* 减小 logo 和文字的间隔 */
  background: rgba(248, 250, 252, 0.5); /* 淡化背景，增加透明度 */
  border-radius: 6px;
  padding: 6px; /* 压缩内边距 */
}

.model-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.model-title {
  font-size: 0.8rem; /* 压缩字体 */
  font-weight: 600;
  color: #1a1a1a;
  margin: 0; /* 移除底部边距 */
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
