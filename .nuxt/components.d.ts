
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AppFooter': typeof import("../components/AppFooter.vue")['default']
    'AppHeader': typeof import("../components/AppHeader.vue")['default']
    'AudioUpload': typeof import("../components/AudioUpload.vue")['default']
    'Breadcrumb': typeof import("../components/Breadcrumb.vue")['default']
    'ChatInterface': typeof import("../components/ChatInterface.vue")['default']
    'FAQSection': typeof import("../components/FAQSection.vue")['default']
    'FeatureCard': typeof import("../components/FeatureCard.vue")['default']
    'FeatureGrid': typeof import("../components/FeatureGrid.vue")['default']
    'FileUpload': typeof import("../components/FileUpload.vue")['default']
    'HeroSection': typeof import("../components/HeroSection.vue")['default']
    'HomeLayout': typeof import("../components/HomeLayout.vue")['default']
    'ImageGallery': typeof import("../components/ImageGallery.vue")['default']
    'LoginModal': typeof import("../components/LoginModal.vue")['default']
    'PricingCard': typeof import("../components/PricingCard.vue")['default']
    'PricingSection': typeof import("../components/PricingSection.vue")['default']
    'ProductDropdown': typeof import("../components/ProductDropdown.vue")['default']
    'ProductShowcase': typeof import("../components/ProductShowcase.vue")['default']
    'Toast': typeof import("../components/Toast.vue")['default']
    'ToastContainer': typeof import("../components/ToastContainer.vue")['default']
    'ToolCategory': typeof import("../components/ToolCategory.vue")['default']
    'VerifyCodeModal': typeof import("../components/VerifyCodeModal.vue")['default']
    'ToolsElevenLabsTool': typeof import("../components/tools/ElevenLabsTool.vue")['default']
    'ToolsFluxKontextTool': typeof import("../components/tools/FluxKontextTool.vue")['default']
    'ToolsGPT4oImageTool': typeof import("../components/tools/GPT4oImageTool.vue")['default']
    'ToolsLumaTool': typeof import("../components/tools/LumaTool.vue")['default']
    'ToolsMidjourneyTool': typeof import("../components/tools/MidjourneyTool.vue")['default']
    'ToolsNanoBananaTool': typeof import("../components/tools/NanoBananaTool.vue")['default']
    'ToolsRunwayTool': typeof import("../components/tools/RunwayTool.vue")['default']
    'ToolsSoraTool': typeof import("../components/tools/SoraTool.vue")['default']
    'ToolsSunoTool': typeof import("../components/tools/SunoTool.vue")['default']
    'ToolsVeo3Tool': typeof import("../components/tools/Veo3Tool.vue")['default']
    'ToolsCommonUploadAudio': typeof import("../components/tools/common/UploadAudio.vue")['default']
    'ToolsCommonUploadImage': typeof import("../components/tools/common/UploadImage.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAppFooter': LazyComponent<typeof import("../components/AppFooter.vue")['default']>
    'LazyAppHeader': LazyComponent<typeof import("../components/AppHeader.vue")['default']>
    'LazyAudioUpload': LazyComponent<typeof import("../components/AudioUpload.vue")['default']>
    'LazyBreadcrumb': LazyComponent<typeof import("../components/Breadcrumb.vue")['default']>
    'LazyChatInterface': LazyComponent<typeof import("../components/ChatInterface.vue")['default']>
    'LazyFAQSection': LazyComponent<typeof import("../components/FAQSection.vue")['default']>
    'LazyFeatureCard': LazyComponent<typeof import("../components/FeatureCard.vue")['default']>
    'LazyFeatureGrid': LazyComponent<typeof import("../components/FeatureGrid.vue")['default']>
    'LazyFileUpload': LazyComponent<typeof import("../components/FileUpload.vue")['default']>
    'LazyHeroSection': LazyComponent<typeof import("../components/HeroSection.vue")['default']>
    'LazyHomeLayout': LazyComponent<typeof import("../components/HomeLayout.vue")['default']>
    'LazyImageGallery': LazyComponent<typeof import("../components/ImageGallery.vue")['default']>
    'LazyLoginModal': LazyComponent<typeof import("../components/LoginModal.vue")['default']>
    'LazyPricingCard': LazyComponent<typeof import("../components/PricingCard.vue")['default']>
    'LazyPricingSection': LazyComponent<typeof import("../components/PricingSection.vue")['default']>
    'LazyProductDropdown': LazyComponent<typeof import("../components/ProductDropdown.vue")['default']>
    'LazyProductShowcase': LazyComponent<typeof import("../components/ProductShowcase.vue")['default']>
    'LazyToast': LazyComponent<typeof import("../components/Toast.vue")['default']>
    'LazyToastContainer': LazyComponent<typeof import("../components/ToastContainer.vue")['default']>
    'LazyToolCategory': LazyComponent<typeof import("../components/ToolCategory.vue")['default']>
    'LazyVerifyCodeModal': LazyComponent<typeof import("../components/VerifyCodeModal.vue")['default']>
    'LazyToolsElevenLabsTool': LazyComponent<typeof import("../components/tools/ElevenLabsTool.vue")['default']>
    'LazyToolsFluxKontextTool': LazyComponent<typeof import("../components/tools/FluxKontextTool.vue")['default']>
    'LazyToolsGPT4oImageTool': LazyComponent<typeof import("../components/tools/GPT4oImageTool.vue")['default']>
    'LazyToolsLumaTool': LazyComponent<typeof import("../components/tools/LumaTool.vue")['default']>
    'LazyToolsMidjourneyTool': LazyComponent<typeof import("../components/tools/MidjourneyTool.vue")['default']>
    'LazyToolsNanoBananaTool': LazyComponent<typeof import("../components/tools/NanoBananaTool.vue")['default']>
    'LazyToolsRunwayTool': LazyComponent<typeof import("../components/tools/RunwayTool.vue")['default']>
    'LazyToolsSoraTool': LazyComponent<typeof import("../components/tools/SoraTool.vue")['default']>
    'LazyToolsSunoTool': LazyComponent<typeof import("../components/tools/SunoTool.vue")['default']>
    'LazyToolsVeo3Tool': LazyComponent<typeof import("../components/tools/Veo3Tool.vue")['default']>
    'LazyToolsCommonUploadAudio': LazyComponent<typeof import("../components/tools/common/UploadAudio.vue")['default']>
    'LazyToolsCommonUploadImage': LazyComponent<typeof import("../components/tools/common/UploadImage.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AppFooter: typeof import("../components/AppFooter.vue")['default']
export const AppHeader: typeof import("../components/AppHeader.vue")['default']
export const AudioUpload: typeof import("../components/AudioUpload.vue")['default']
export const Breadcrumb: typeof import("../components/Breadcrumb.vue")['default']
export const ChatInterface: typeof import("../components/ChatInterface.vue")['default']
export const FAQSection: typeof import("../components/FAQSection.vue")['default']
export const FeatureCard: typeof import("../components/FeatureCard.vue")['default']
export const FeatureGrid: typeof import("../components/FeatureGrid.vue")['default']
export const FileUpload: typeof import("../components/FileUpload.vue")['default']
export const HeroSection: typeof import("../components/HeroSection.vue")['default']
export const HomeLayout: typeof import("../components/HomeLayout.vue")['default']
export const ImageGallery: typeof import("../components/ImageGallery.vue")['default']
export const LoginModal: typeof import("../components/LoginModal.vue")['default']
export const PricingCard: typeof import("../components/PricingCard.vue")['default']
export const PricingSection: typeof import("../components/PricingSection.vue")['default']
export const ProductDropdown: typeof import("../components/ProductDropdown.vue")['default']
export const ProductShowcase: typeof import("../components/ProductShowcase.vue")['default']
export const Toast: typeof import("../components/Toast.vue")['default']
export const ToastContainer: typeof import("../components/ToastContainer.vue")['default']
export const ToolCategory: typeof import("../components/ToolCategory.vue")['default']
export const VerifyCodeModal: typeof import("../components/VerifyCodeModal.vue")['default']
export const ToolsElevenLabsTool: typeof import("../components/tools/ElevenLabsTool.vue")['default']
export const ToolsFluxKontextTool: typeof import("../components/tools/FluxKontextTool.vue")['default']
export const ToolsGPT4oImageTool: typeof import("../components/tools/GPT4oImageTool.vue")['default']
export const ToolsLumaTool: typeof import("../components/tools/LumaTool.vue")['default']
export const ToolsMidjourneyTool: typeof import("../components/tools/MidjourneyTool.vue")['default']
export const ToolsNanoBananaTool: typeof import("../components/tools/NanoBananaTool.vue")['default']
export const ToolsRunwayTool: typeof import("../components/tools/RunwayTool.vue")['default']
export const ToolsSoraTool: typeof import("../components/tools/SoraTool.vue")['default']
export const ToolsSunoTool: typeof import("../components/tools/SunoTool.vue")['default']
export const ToolsVeo3Tool: typeof import("../components/tools/Veo3Tool.vue")['default']
export const ToolsCommonUploadAudio: typeof import("../components/tools/common/UploadAudio.vue")['default']
export const ToolsCommonUploadImage: typeof import("../components/tools/common/UploadImage.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAppFooter: LazyComponent<typeof import("../components/AppFooter.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../components/AppHeader.vue")['default']>
export const LazyAudioUpload: LazyComponent<typeof import("../components/AudioUpload.vue")['default']>
export const LazyBreadcrumb: LazyComponent<typeof import("../components/Breadcrumb.vue")['default']>
export const LazyChatInterface: LazyComponent<typeof import("../components/ChatInterface.vue")['default']>
export const LazyFAQSection: LazyComponent<typeof import("../components/FAQSection.vue")['default']>
export const LazyFeatureCard: LazyComponent<typeof import("../components/FeatureCard.vue")['default']>
export const LazyFeatureGrid: LazyComponent<typeof import("../components/FeatureGrid.vue")['default']>
export const LazyFileUpload: LazyComponent<typeof import("../components/FileUpload.vue")['default']>
export const LazyHeroSection: LazyComponent<typeof import("../components/HeroSection.vue")['default']>
export const LazyHomeLayout: LazyComponent<typeof import("../components/HomeLayout.vue")['default']>
export const LazyImageGallery: LazyComponent<typeof import("../components/ImageGallery.vue")['default']>
export const LazyLoginModal: LazyComponent<typeof import("../components/LoginModal.vue")['default']>
export const LazyPricingCard: LazyComponent<typeof import("../components/PricingCard.vue")['default']>
export const LazyPricingSection: LazyComponent<typeof import("../components/PricingSection.vue")['default']>
export const LazyProductDropdown: LazyComponent<typeof import("../components/ProductDropdown.vue")['default']>
export const LazyProductShowcase: LazyComponent<typeof import("../components/ProductShowcase.vue")['default']>
export const LazyToast: LazyComponent<typeof import("../components/Toast.vue")['default']>
export const LazyToastContainer: LazyComponent<typeof import("../components/ToastContainer.vue")['default']>
export const LazyToolCategory: LazyComponent<typeof import("../components/ToolCategory.vue")['default']>
export const LazyVerifyCodeModal: LazyComponent<typeof import("../components/VerifyCodeModal.vue")['default']>
export const LazyToolsElevenLabsTool: LazyComponent<typeof import("../components/tools/ElevenLabsTool.vue")['default']>
export const LazyToolsFluxKontextTool: LazyComponent<typeof import("../components/tools/FluxKontextTool.vue")['default']>
export const LazyToolsGPT4oImageTool: LazyComponent<typeof import("../components/tools/GPT4oImageTool.vue")['default']>
export const LazyToolsLumaTool: LazyComponent<typeof import("../components/tools/LumaTool.vue")['default']>
export const LazyToolsMidjourneyTool: LazyComponent<typeof import("../components/tools/MidjourneyTool.vue")['default']>
export const LazyToolsNanoBananaTool: LazyComponent<typeof import("../components/tools/NanoBananaTool.vue")['default']>
export const LazyToolsRunwayTool: LazyComponent<typeof import("../components/tools/RunwayTool.vue")['default']>
export const LazyToolsSoraTool: LazyComponent<typeof import("../components/tools/SoraTool.vue")['default']>
export const LazyToolsSunoTool: LazyComponent<typeof import("../components/tools/SunoTool.vue")['default']>
export const LazyToolsVeo3Tool: LazyComponent<typeof import("../components/tools/Veo3Tool.vue")['default']>
export const LazyToolsCommonUploadAudio: LazyComponent<typeof import("../components/tools/common/UploadAudio.vue")['default']>
export const LazyToolsCommonUploadImage: LazyComponent<typeof import("../components/tools/common/UploadImage.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
