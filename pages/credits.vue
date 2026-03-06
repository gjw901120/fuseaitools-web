<template>
  <div class="credits-page">
    <section class="hero-section">
      <div class="simply-container">
        <h1 class="page-title">Credits</h1>
      </div>
    </section>

    <section class="credits-content">
      <div class="simply-container">
        <!-- 折扣说明：显示在 Subscription 上方，订阅与充值均可享受 -->
        <div v-if="isSubscription && subscriptionDetail.discount != null" class="discount-banner">
          <span class="discount-value">Discount {{ formatDiscount(subscriptionDetail.discount) }}</span>
          <span class="discount-desc">This discount applies to both subscription and recharge.</span>
        </div>

        <!-- Subscription：仅 isSubscription === 1 时渲染 -->
        <div v-if="isSubscription" class="progress-section">
          <div class="progress-card">
            <div class="progress-label">
              <span class="progress-title">
                Subscription Credits (Remaining)
                <span v-if="subscriptionDetailFormatted.startDateFormatted || subscriptionDetailFormatted.endDateFormatted" class="title-dates">{{ subscriptionDetailFormatted.startDateFormatted }} – {{ subscriptionDetailFormatted.endDateFormatted }}</span>
                <span v-if="subscriptionPackageLabel" class="title-package"> · {{ subscriptionPackageLabel }}</span>
              </span>
              <div class="progress-tail-actions">
                <template v-if="subscriptionDetail.refundStatus === 0">
                  <template v-if="subscriptionDetail.isCancel === 1">
                    <button type="button" class="btn-refund btn-secondary" :disabled="refundLoading" @click="cancelSubscription">Cancel Subscription</button>
                    <button type="button" class="btn-refund btn-primary" :disabled="refundLoading" @click="refundSubscription">Cancel & Refund</button>
                  </template>
                  <template v-else>
                    <span class="refund-status-text">Subscription Terminated</span>
                    <button type="button" class="btn-refund btn-primary" :disabled="refundLoading" @click="refundSubscription">Cancel & Refund</button>
                  </template>
                </template>
                <span v-else-if="subscriptionDetail.refundStatus === 1" class="refund-status-text">Refund Applied</span>
                <span v-else-if="subscriptionDetail.refundStatus === 2" class="refund-status-text">Refund In Progress</span>
              </div>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-track">
                <div class="progress-fill subscription" :style="{ width: subscriptionRatioPercent + '%' }"></div>
              </div>
            </div>
            <div class="progress-meta progress-meta-ends">
              <span class="progress-meta-left">{{ subscriptionDetail.remainingCredits }} / {{ subscriptionDetail.credits }} credits</span>
              <span class="progress-meta-right">{{ subscriptionRatioPercent }}% remaining</span>
            </div>
          </div>
        </div>

        <!-- Recharge：刻度 2000/5000/8000/10000，remaining/10000>=1 时满格+能量特效，下方只显示 XXXX credits -->
        <div v-if="isRecharge" class="progress-section">
          <div class="progress-card recharge-card">
            <div class="progress-label">
              <span class="progress-title">Recharge Credits</span>
              <div class="progress-tail-actions">
                <template v-if="rechargeDetail.refundStatus === 0">
                  <button type="button" class="btn-refund btn-primary" :disabled="refundLoading" @click="refundRecharge">Refund</button>
                </template>
                <span v-else-if="rechargeDetail.refundStatus === 1" class="refund-status-text">Refund Applied</span>
                <span v-else-if="rechargeDetail.refundStatus === 2" class="refund-status-text">Refund In Progress</span>
              </div>
            </div>
            <div class="recharge-ruler">
              <span v-for="t in rechargeRulerTicks" :key="t" class="ruler-tick" :style="{ left: (t / rechargeRulerMax) * 100 + '%' }">{{ (t / 1000).toFixed(0) }}k</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-track recharge-track">
                <div class="progress-fill recharge" :style="{ width: rechargeRemainingBarPercent + '%' }"></div>
                <div v-if="rechargeRemainingBarPercent >= 100" class="energy-effect" title="Your credits are full and overflowing!"></div>
              </div>
            </div>
            <div class="progress-meta progress-meta-ends">
              <span class="progress-meta-left">{{ formatCreditsNum(rechargeDetail.remainingCredits) }} / {{ rechargeRulerMax }} credits</span>
              <span class="progress-meta-right">{{ rechargeRemainingBarPercentText }}%<span v-if="rechargeOverflow" class="overflow-plus">+</span> remaining</span>
            </div>
          </div>
        </div>

        <!-- 消耗历史 creditsDetails -->
        <div class="history-section">
          <h2 class="section-title">Consumption History</h2>
          <div v-if="loading" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading...</span>
          </div>
          <div v-else-if="!creditsDetails.length" class="empty-state">
            <i class="fas fa-history"></i>
            <p>No consumption records yet</p>
          </div>
          <div v-else class="history-table-wrap">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Title</th>
                  <th>Credits</th>
                  <th>Discount</th>
                  <th>Discount Credits</th>
                  <th>Status</th>
                  <th>Completed Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in creditsDetails"
                  :key="row.recordId + '-' + index"
                  class="history-row"
                  @click="goToDetail(row)"
                >
                  <td>{{ row.modelCategory }} · {{ row.model }}</td>
                  <td>{{ row.title }}</td>
                  <td>{{ formatCreditsNum(row.credits) }}</td>
                  <td>
                    <span class="badge discount">{{ formatDiscount(row.discount) }}</span>
                  </td>
                  <td>{{ row.discountCredits != null ? formatCreditsNum(row.discountCredits) : '—' }}</td>
                  <td>
                    <span :class="['badge', 'status-' + (row.status || '').toLowerCase()]">{{ row.status || '—' }}</span>
                  </td>
                  <td>{{ row.completedDate || '—' }}</td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-bar">
              <button type="button" class="page-btn" :disabled="historyPage <= 1" @click="prevPage">Previous</button>
              <span class="page-info">Page {{ historyPage }}</span>
              <button v-if="hasNextPage" type="button" class="page-btn" @click="nextPage">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recharge 退款确认弹窗 -->
    <Teleport to="body">
      <div v-if="rechargeRefundModal" class="refund-modal-overlay" @click.self="rechargeRefundModal = false">
        <div class="refund-modal">
          <h3 class="refund-modal-title">Recharge Refund</h3>
          <p class="refund-modal-amount">Refundable amount: <strong>${{ rechargeRefundAmount }}</strong></p>
          <div class="refund-modal-actions">
            <button type="button" class="btn-refund btn-secondary" :disabled="rechargeRefundSubmitting" @click="rechargeRefundModal = false">Cancel</button>
            <button type="button" class="btn-refund btn-primary" :disabled="rechargeRefundSubmitting" @click="confirmRechargeRefund">Confirm Refund</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Subscription 退款确认弹窗 -->
    <Teleport to="body">
      <div v-if="subscriptionRefundModal" class="refund-modal-overlay" @click.self="subscriptionRefundModal = false">
        <div class="refund-modal">
          <h3 class="refund-modal-title">Subscription Refund</h3>
          <p class="refund-modal-amount">Refundable amount: <strong>${{ subscriptionRefundAmount }}</strong></p>
          <div class="refund-modal-actions">
            <button type="button" class="btn-refund btn-secondary" :disabled="subscriptionRefundSubmitting" @click="subscriptionRefundModal = false">Cancel</button>
            <button type="button" class="btn-refund btn-primary" :disabled="subscriptionRefundSubmitting" @click="confirmSubscriptionRefund">Confirm Refund</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Credits - FuseAI Tools',
  meta: [
    { name: 'description', content: 'View your credits balance and consumption history.' }
  ]
})

const router = useRouter()
const loading = ref(false)
const refundLoading = ref(false)
const { showError, showSuccess } = useToast()
const rechargeRefundModal = ref(false)
const rechargeRefundAmount = ref(0)
const rechargeRefundSubmitting = ref(false)
const subscriptionRefundModal = ref(false)
const subscriptionRefundAmount = ref(0)
const subscriptionRefundSubmitting = ref(false)

// API 原始数据
const isSubscription = ref(0)
const isRecharge = ref(0)
const subscriptionDetail = ref({
  isCancel: 0,
  refundStatus: 0,
  credits: 0,
  remainingCredits: 0,
  ratio: 0,
  startDate: null,
  endDate: null,
  packageType: '',
  discount: 1,
  type: ''
})
const rechargeDetail = ref({ remainingCredits: 0, totalCredits: 0, refundStatus: 0 })
const creditsDetails = ref([])
const historyPage = ref(1)
const historyPageSize = 10

const hasNextPage = computed(() => creditsDetails.value.length >= historyPageSize)

// 格式化日期：[2026,2,13] 或 "2026-02-13" -> 2026-02-13
function formatDatePart(val) {
  if (val == null) return ''
  if (typeof val === 'string') return val
  if (!Array.isArray(val) || val.length < 3) return ''
  const [y, m, d] = val
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// 订阅：剩余比例（ratio 或 计算）
const subscriptionRatioPercent = computed(() => {
  const d = subscriptionDetail.value
  if (d.ratio != null) return Math.round(d.ratio * 100)
  if (d.credits <= 0) return 0
  return Math.round((d.remainingCredits / d.credits) * 100)
})

// 订阅日期显示（支持数组 [y,m,d] 或字符串）
const subscriptionDetailFormatted = computed(() => {
  const d = subscriptionDetail.value
  return {
    startDateFormatted: d.startDate ? formatDatePart(d.startDate) : '',
    endDateFormatted: d.endDate ? formatDatePart(d.endDate) : ''
  }
})

const subscriptionPackageLabel = computed(() => {
  const d = subscriptionDetail.value
  if (d.packageType && d.type) return `${d.packageType} (${d.type})`
  return d.packageType || d.type || ''
})

// 充值：剩余量在刻度 0–10000 上显示，remaining/10000 >= 1 时满格并显示能量特效
const rechargeRulerMax = 10000
const rechargeRulerTicks = [2000, 5000, 8000, 10000]

const rechargeRemainingBarPercent = computed(() => {
  const remaining = Number(rechargeDetail.value.remainingCredits) || 0
  return Math.min((remaining / rechargeRulerMax) * 100, 100)
})

const rechargeRemainingBarPercentText = computed(() => {
  const remaining = Number(rechargeDetail.value.remainingCredits) || 0
  return Math.min(Math.round((remaining / rechargeRulerMax) * 100), 100)
})

const rechargeOverflow = computed(() => (Number(rechargeDetail.value.remainingCredits) || 0) > rechargeRulerMax)

function formatDiscount(v) {
  if (v == null) return '—'
  if (v >= 1) return '100%'
  return (v * 100).toFixed(0) + '%'
}

function formatCreditsNum(v) {
  if (v == null) return '—'
  const n = Number(v)
  return n % 1 === 0 ? n : n.toFixed(2)
}

// modelCategory + model -> 详情页 path（与 history 一致，带 record-id 可跳详情）
const modelToPathMap = {
  Elevenlabs: {
    elevenlabs_sound_effect: '/home/elevenlabs/sound-effect-v2',
    elevenlabs_audio_isolation: '/home/elevenlabs/audio-isolation',
    elevenlabs_speech_to_text: '/home/elevenlabs/speech-to-text',
    elevenlabs_text_to_speech_multilingual: '/home/elevenlabs/multilingual-v2',
    elevenlabs_text_to_speech_turbo: '/home/elevenlabs/turbo-2-5',
    default: '/home/elevenlabs/multilingual-v2'
  },
  Sora: {
    'sora-watermark-remover': '/home/sora/watermark-remover',
    'sora-2-text-to-video': '/home/sora/text-to-video',
    'sora-2-image-to-video': '/home/sora/image-to-video',
    default: '/home/sora/text-to-video'
  },
  Runway: {
    runway_extend: '/home/runway/extend',
    runway_generate: '/home/runway/generate',
    runway_aleph: '/home/runway/aleph',
    default: '/home/runway/generate'
  },
  Veo3: {
    REFERENCE_2_VIDEO: '/home/veo3/reference-to-video',
    TEXT_2_VIDEO: '/home/veo3/text-to-video',
    FIRST_AND_LAST_FRAMES_2_VIDEO: '/home/veo3/first-and-last-to-video',
    VIDEO_EXTEND: '/home/veo3/extend',
    default: '/home/veo3/text-to-video'
  },
  Luma: {
    Luma: '/home/luma/generate',
    default: '/home/luma/generate'
  },
  Midjourney: { default: '/home/midjourney/imagine' },
  'GPT 4o Image': { default: '/home/gpt-4o-image/generate' },
  'Flux Kontext': { default: '/home/flux-kontext/generate' },
  'Nano Banana': { default: '/home/nano-banana/generate' },
  Suno: { default: '/home/suno/generate' },
  GPT: { default: '/home/gpt/generate' },
  DeepSeek: { default: '/home/deepseek/generate' },
  Claude: { default: '/home/claude/generate' },
  Gemini: { default: '/home/gemini/generate' }
}

function getDetailPath(modelCategory, model) {
  const cat = modelToPathMap[modelCategory]
  if (!cat) return '/home'
  const path = cat[model] || cat.default
  return path || '/home'
}

function goToDetail(row) {
  const path = getDetailPath(row.modelCategory, row.model)
  router.push(`${path}?record-id=${encodeURIComponent(row.recordId)}`)
}

async function fetchCredits(page = 1) {
  historyPage.value = page
  loading.value = true
  try {
    const { get } = useApi()
    const token = useAuth().token?.value || (typeof localStorage !== 'undefined' && localStorage.getItem('auth_token'))
    if (!token) {
      loading.value = false
      return
    }
    const data = await get(`/api/user/credits-detail?page=${page}&size=${historyPageSize}`)
    if (data && typeof data === 'object') {
      if (data.isSubscription != null) isSubscription.value = data.isSubscription
      if (data.isRecharge != null) isRecharge.value = data.isRecharge
      if (data.subscriptionDetail) subscriptionDetail.value = { ...subscriptionDetail.value, ...data.subscriptionDetail }
      if (data.rechargeDetail) rechargeDetail.value = { ...rechargeDetail.value, ...data.rechargeDetail }
      if (Array.isArray(data.creditsDetails)) creditsDetails.value = data.creditsDetails
    }
  } catch (e) {
    console.error('Fetch credits failed:', e)
  } finally {
    loading.value = false
  }
}

async function cancelSubscription() {
  refundLoading.value = true
  try {
    const { post } = useApi()
    await post('/api/refund/cancel-subscription', {})
    await fetchCredits(1)
  } catch (e) {
    console.error('Cancel subscription failed:', e)
  } finally {
    refundLoading.value = false
  }
}

async function refundSubscription() {
  refundLoading.value = true
  try {
    const { get } = useApi()
    const data = await get('/api/refund/refund-subscription-detail')
    subscriptionRefundAmount.value = data?.refundAmount ?? 0
    subscriptionRefundModal.value = true
  } catch (e) {
    console.error('Refund subscription failed:', e)
  } finally {
    refundLoading.value = false
  }
}

async function confirmSubscriptionRefund() {
  subscriptionRefundSubmitting.value = true
  try {
    const { post } = useApi()
    await post('/api/refund/refund-subscription', {})
    showSuccess('Application submitted. Please wait for the refund to complete.')
    subscriptionRefundModal.value = false
    await fetchCredits(1)
  } catch (e) {
    console.error('Confirm subscription refund failed:', e)
  } finally {
    subscriptionRefundSubmitting.value = false
  }
}

async function refundRecharge() {
  refundLoading.value = true
  try {
    const { get } = useApi()
    const data = await get('/api/refund/refund-recharge-detail')
    rechargeRefundAmount.value = data?.refundAmount ?? 0
    rechargeRefundModal.value = true
  } catch (e) {
    showError(e?.message || 'Request failed')
  } finally {
    refundLoading.value = false
  }
}

async function confirmRechargeRefund() {
  rechargeRefundSubmitting.value = true
  try {
    const { post } = useApi()
    await post('/api/refund/refund-recharge', {})
    showSuccess('Application submitted. Please wait for the refund to complete.')
    rechargeRefundModal.value = false
    await fetchCredits(1)
  } catch (e) {
    showError(e?.message || 'Request failed')
  } finally {
    rechargeRefundSubmitting.value = false
  }
}

function prevPage() {
  if (historyPage.value <= 1) return
  historyPage.value--
  fetchCredits(historyPage.value)
}

function nextPage() {
  historyPage.value++
  fetchCredits(historyPage.value)
}

onMounted(() => {
  fetchCredits(1)
})
</script>

<style scoped>
.credits-page {
  min-height: 100vh;
  background: #f8fafc;
}

.hero-section {
  padding: 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.credits-content {
  padding: 32px 0 60px;
}

.discount-banner {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 14px 20px;
  margin-bottom: 24px;
}

.discount-value {
  font-weight: 600;
  color: #92400e;
  margin-right: 12px;
}

.discount-desc {
  font-size: 0.875rem;
  color: #78350f;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.progress-card {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.title-dates,
.title-package {
  font-weight: 500;
  color: #64748b;
  font-size: 0.9em;
  margin-left: 4px;
}

.progress-value {
  font-size: 0.875rem;
  color: #64748b;
}

.progress-meta {
  margin-top: 6px;
  font-size: 0.8125rem;
  color: #64748b;
}

.progress-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-tail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
  margin-left: 12px;
}

.refund-status-text {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #059669;
  align-self: center;
}

.btn-refund {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  border: 1px solid transparent;
}

.btn-refund:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-refund.btn-secondary {
  background: #fff;
  border-color: #cbd5e1;
  color: #475569;
}

.btn-refund.btn-secondary:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.btn-refund.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #5a67d8;
}

.btn-refund.btn-primary:hover:not(:disabled) {
  filter: brightness(1.08);
}

.refund-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.refund-modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  min-width: 320px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.refund-modal-title {
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.refund-modal-amount {
  margin: 0 0 20px 0;
  font-size: 1rem;
  color: #475569;
}

.refund-modal-amount strong {
  color: #059669;
}

.refund-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.progress-meta-ends {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-meta-left {
  flex-shrink: 0;
}

.progress-meta-right {
  flex-shrink: 0;
}

.overflow-plus {
  font-weight: 700;
  color: #059669;
  margin-left: 1px;
  font-size: 1em;
}

.meta-extra {
  margin-left: 4px;
}

.progress-track {
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.recharge-track {
  margin-top: 6px;
  overflow: visible;
}

.progress-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-fill.subscription {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.progress-fill.recharge {
  background: linear-gradient(90deg, #10b981, #059669);
}

.recharge-ruler {
  position: relative;
  height: 18px;
  margin-bottom: 2px;
}

.recharge-ruler .ruler-tick {
  position: absolute;
  transform: translateX(-50%);
  font-size: 11px;
  color: #94a3b8;
}

.energy-effect {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 64px;
  border-radius: 6px;
  cursor: help;
  background: linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.6) 25%, rgba(34, 197, 94, 0.95) 65%, rgba(74, 222, 128, 1) 90%, rgba(134, 239, 172, 1) 100%);
  box-shadow: 0 0 24px rgba(34, 197, 94, 0.8), 0 0 48px rgba(16, 185, 129, 0.4);
  animation: energyGlow 0.9s ease-in-out infinite;
}

.energy-effect::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(90deg, transparent 40%, rgba(255, 255, 255, 0.25) 100%);
  border-radius: 6px;
  animation: energyShine 1.5s ease-in-out infinite;
}

.energy-effect::after {
  content: '';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 16px #a7f3d0, 0 0 32px rgba(34, 197, 94, 0.9), 0 0 48px rgba(16, 185, 129, 0.6);
  animation: energyCore 0.6s ease-in-out infinite;
}

@keyframes energyGlow {
  0%, 100% { opacity: 0.9; box-shadow: 0 0 24px rgba(34, 197, 94, 0.7), 0 0 48px rgba(16, 185, 129, 0.35); }
  50% { opacity: 1; box-shadow: 0 0 36px rgba(34, 197, 94, 1), 0 0 64px rgba(16, 185, 129, 0.5); }
}

@keyframes energyShine {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}

@keyframes energyCore {
  0%, 100% { opacity: 0.95; transform: translateY(-50%) scale(1); box-shadow: 0 0 16px #a7f3d0, 0 0 32px rgba(34, 197, 94, 0.8); }
  50% { opacity: 1; transform: translateY(-50%) scale(1.35); box-shadow: 0 0 24px #a7f3d0, 0 0 48px rgba(34, 197, 94, 1); }
}

.history-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: #64748b;
}

.empty-state i,
.loading-state i {
  font-size: 2rem;
}

.history-table-wrap {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.history-table th,
.history-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.history-table th {
  font-weight: 600;
  color: #475569;
  background: #f8fafc;
}

.history-table td {
  color: #334155;
}

.history-row {
  cursor: pointer;
}

.history-row:hover {
  background: #f8fafc;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.discount {
  background: #dcfce7;
  color: #166534;
}

.badge.status-completed {
  background: #dcfce7;
  color: #166534;
}

.badge.status-failed {
  background: #fee2e2;
  color: #991b1b;
}

.badge.status-progress {
  background: #dbeafe;
  color: #1e40af;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #667eea;
  color: #667eea;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.875rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .progress-section {
    gap: 16px;
  }

  .progress-card {
    padding: 16px;
  }

  .history-table th,
  .history-table td {
    padding: 10px 12px;
    font-size: 0.8125rem;
  }
}
</style>
