import { reactive, ref, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { U as UploadAudio } from "./UploadAudio-CGq6L9QH.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { _ as _export_sfc, u as useRouter, d as useRoute } from "../server.mjs";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
const _imports_0 = publicAssetsURL("/tools-logo/Elevenlabs.png?v=20260319a");
const elevenlabsVoices = [
  {
    "id": "BIvP0GN1cAtSRTxNHnWS",
    "name": "Ellen",
    "description": "Serious, Direct and Confident"
  },
  {
    "id": "aMSt68OGf4xUZAnLpTU8",
    "name": "Juniper",
    "description": "Grounded and Professional"
  },
  {
    "id": "RILOU7YmBhvwJGDGjNmP",
    "name": "Jane",
    "description": "Professional Audiobook Reader"
  },
  {
    "id": "EkK5I93UQWFDigLMpZcX",
    "name": "James",
    "description": "Husky, Engaging and Bold"
  },
  {
    "id": "Z3R5wn05IrDiVCyEkUrK",
    "name": "Arabella",
    "description": "Mysterious and Emotive"
  },
  {
    "id": "tnSpp4vdxKPjI9w0GnoV",
    "name": "Hope",
    "description": "Upbeat and clear"
  },
  {
    "id": "NNl6r8mD7vthiJatiJt1",
    "name": "Bradford",
    "description": "Expressive and Articulate"
  },
  {
    "id": "YOq2y2Up4RgXP2HyXjE5",
    "name": "Xavier",
    "description": "Dominating, Metalic Announcer"
  },
  {
    "id": "Bj9UqZbhQsanLzgalpEG",
    "name": "Austin",
    "description": "Deep, Raspy and Authentic"
  },
  {
    "id": "c6SfcYrb2t09NHXiT80T",
    "name": "Jarnathan",
    "description": "Confident and Versatile"
  },
  {
    "id": "B8gJV1IhpuegLxdpXFOE",
    "name": "Kuon",
    "description": "Cheerful, Clear and Steady"
  },
  {
    "id": "exsUS4vynmxd379XN4yO",
    "name": "Blondie",
    "description": "Conversational"
  },
  {
    "id": "BpjGufoPiobT79j2vtj4",
    "name": "Priyanka",
    "description": "Calm, Neutral and Relaxed"
  },
  {
    "id": "2zRM7PkgwBPiau2jvVXc",
    "name": "Monika Sogam",
    "description": "Deep and Natural"
  },
  {
    "id": "1SM7GgM6IMuvQlz2BwM3",
    "name": "Mark",
    "description": "Casual, Relaxed and Light"
  },
  {
    "id": "ouL9IsyrSnUkCmfnD02u",
    "name": "Grimblewood Thornwhisker",
    "description": "Snarky Gnome & Magical Maintainer"
  },
  {
    "id": "5l5f8iK3YPeGga21rQIX",
    "name": "Adeline",
    "description": "Feminine and Conversational"
  },
  {
    "id": "scOwDtmlUjD3prqpp97I",
    "name": "Sam",
    "description": "Support Agent"
  },
  {
    "id": "NOpBlnGInO9m6vDvFkFC",
    "name": "Spuds Oxley",
    "description": "Wise and Approachable"
  },
  {
    "id": "BZgkqPqms7Kj9ulSkVzn",
    "name": "Eve",
    "description": "Authentic, Energetic and Happy"
  },
  {
    "id": "wo6udizrrtpIxWGp2qJk",
    "name": "Northern Terry",
    "description": ""
  },
  {
    "id": "yjJ45q8TVCrtMhEKurxY",
    "name": "Dr. Von",
    "description": "Quirky, Mad Scientist"
  },
  {
    "id": "gU0LNdkMOQCOrPrwtbee",
    "name": "British Football Announcer",
    "description": ""
  },
  {
    "id": "DGzg6RaUqxGRTHSBjfgF",
    "name": "Brock",
    "description": "Commanding and Loud Sergeant"
  },
  {
    "id": "DGTOOUoGpoP6UZ9uSWfA",
    "name": "Célian",
    "description": "Documentary Narrator"
  },
  {
    "id": "x70vRnQBMBu4FAYhjJbO",
    "name": "Nathan",
    "description": "Virtual Radio Host"
  },
  {
    "id": "P1bg08DkjqiVEzOn76yG",
    "name": "Viraj",
    "description": "Rich and Soft"
  },
  {
    "id": "qDuRKMlYmrm8trt5QyBn",
    "name": "Taksh",
    "description": "Calm, Serious and Smooth"
  },
  {
    "id": "kUUTqKQ05NMGulF08DDf",
    "name": "Guadeloupe Merryweather",
    "description": "Emotional"
  },
  {
    "id": "qXpMhyvQqiRxWQs4qSSB",
    "name": "Horatius",
    "description": "Energetic Character Voice"
  },
  {
    "id": "TX3LPaxmHKxFdv7VOQHJ",
    "name": "Liam",
    "description": "Energetic, Social Media Creator"
  },
  {
    "id": "iP95p4xoKVk53GoZ742B",
    "name": "Chris",
    "description": "Charming, Down-to-Earth"
  },
  {
    "id": "SOYHLrjzK2X1ezoPC6cr",
    "name": "Harry",
    "description": "Fierce Warrior"
  },
  {
    "id": "N2lVS1w4EtoT3dr4eOWO",
    "name": "Callum",
    "description": "Husky Trickster"
  },
  {
    "id": "FGY2WhTYpPnrIDTdsKH5",
    "name": "Laura",
    "description": "Enthusiast, Quirky Attitude"
  },
  {
    "id": "XB0fDUnXU5powFXDhCwa",
    "name": "Charlotte",
    "description": ""
  },
  {
    "id": "cgSgspJ2msm6clMCkdW9",
    "name": "Jessica",
    "description": "Playful, Bright, Warm"
  },
  {
    "id": "MnUw1cSnpiLoLhpd3Hqp",
    "name": "Heather Rey",
    "description": "Rushed and Friendly"
  },
  {
    "id": "kPzsL2i3teMYv0FxEYQ6",
    "name": "Brittney",
    "description": "Social Media Voice - Fun, Youthful & Informative"
  },
  {
    "id": "UgBBYS2sOqTuMpoF3BR0",
    "name": "Mark",
    "description": "Natural Conversations"
  },
  {
    "id": "IjnA9kwZJHJ20Fp7Vmy6",
    "name": "Matthew",
    "description": "Casual, Friendly and Smooth"
  },
  {
    "id": "KoQQbl9zjAdLgKZjm8Ol",
    "name": "Pro Narrator",
    "description": "Convincing story teller"
  },
  {
    "id": "hpp4J3VqNfWAUOO0d1Us",
    "name": "Bella",
    "description": "Professional, Bright, Warm"
  },
  {
    "id": "pNInz6obpgDQGcFmaJgB",
    "name": "Adam",
    "description": "Dominant, Firm"
  },
  {
    "id": "nPczCjzI2devNBz1zQrb",
    "name": "Brian",
    "description": "Deep, Resonant and Comforting"
  },
  {
    "id": "L0Dsvb3SLTyegXwtm47J",
    "name": "Archer",
    "description": ""
  },
  {
    "id": "uYXf8XasLslADfZ2MB4u",
    "name": "Hope",
    "description": "Bubbly, Gossipy and Girly"
  },
  {
    "id": "gs0tAILXbY5DNrJrsM6F",
    "name": "Jeff",
    "description": "Classy, Resonating and Strong"
  },
  {
    "id": "DTKMou8ccj1ZaWGBiotd",
    "name": "Jamahal",
    "description": "Young, Vibrant, and Natural"
  },
  {
    "id": "vBKc2FfBKJfcZNyEt1n6",
    "name": "Finn",
    "description": "Youthful, Eager and Energetic"
  },
  {
    "id": "TmNe0cCqkZBMwPWOd3RD",
    "name": "Smith",
    "description": "Mellow, Spontaneous, and Bassy"
  },
  {
    "id": "DYkrAHD8iwork3YSUBbs",
    "name": "Tom",
    "description": "Conversations & Books"
  },
  {
    "id": "56AoDkrOh6qfVPDXZ7Pt",
    "name": "Cassidy",
    "description": "Crisp, Direct and Clear"
  },
  {
    "id": "eR40ATw9ArzDf9h3v7t7",
    "name": "Addison 2.0",
    "description": "Australian Audiobook & Podcast"
  },
  {
    "id": "g6xIsTj2HwM6VR4iXFCw",
    "name": "Jessica Anne Bogart",
    "description": "Chatty and Friendly"
  },
  {
    "id": "lcMyyd2HUfFzxdCaC4Ta",
    "name": "Lucy",
    "description": "Fresh & Casual"
  },
  {
    "id": "6aDn1KB0hjpdcocrUkmq",
    "name": "Tiffany",
    "description": "Natural and Welcoming"
  },
  {
    "id": "Sq93GQT4X1lKDXsQcixO",
    "name": "Felix",
    "description": "Warm, positive & contemporary RP"
  },
  {
    "id": "piI8Kku0DcvcL6TTSeQt",
    "name": "Malyx",
    "description": "Echoey, Menacing and Deep Demon"
  },
  {
    "id": "KTPVrSVAEUSJRClDzBw7",
    "name": "Flicker",
    "description": "Cheerful Fairy & Sparkly Sweetness"
  },
  {
    "id": "flHkNRp1BlvT73UL6gyz",
    "name": "Bob",
    "description": "Rugged and Warm Cowboy"
  },
  {
    "id": "9yzdeviXkFddZ4Oz8Mok",
    "name": "Jessica Anne Bogart",
    "description": "Eloquent Villain"
  },
  {
    "id": "pPdl9cQBQq4p6mRkZy2Z",
    "name": "Lutz",
    "description": "Chuckling, Giggly and Cheerful"
  },
  {
    "id": "0SpgpJ4D3MpHCiWdyTg3",
    "name": "Emma",
    "description": "Adorable and Upbeat"
  },
  {
    "id": "UFO0Yv86wqRxAt1DmXUu",
    "name": "Matthew Schmitz",
    "description": "Elitist, Arrogant, Conniving Tyrant"
  },
  {
    "id": "oR4uRy4fHDUGGISL0Rev",
    "name": "Sarcastic and Sultry Villain",
    "description": ""
  },
  {
    "id": "zYcjlYFOd3taleS0gkk3",
    "name": "Myrrdin",
    "description": "Wise and Magical Narrator"
  },
  {
    "id": "nzeAacJi50IvxcyDnMXa",
    "name": "Edward",
    "description": "Loud, Confident and Cocky"
  },
  {
    "id": "ruirxsoakN0GWmGNIo04",
    "name": "Marshal",
    "description": "Friendly, Funny Professor"
  },
  {
    "id": "1KFdM0QCwQn4rmn5nn9C",
    "name": "John Morgan",
    "description": "Gritty, Rugged Cowboy"
  },
  {
    "id": "TC0Zp7WVFzhA8zpTlRqV",
    "name": "Parasyte",
    "description": "Whispers from the Deep Dark"
  },
  {
    "id": "ljo9gAlSqKOvF6D8sOsX",
    "name": "Aria",
    "description": "Sultry Villain"
  },
  {
    "id": "PPzYpIqttlTYA83688JI",
    "name": "Viking Bjorn",
    "description": "Epic Medieval Raider"
  },
  {
    "id": "ZF6FPAbjXT4488VcRRnw",
    "name": "Pirate Marshal",
    "description": ""
  },
  {
    "id": "8JVbfL6oEdmuxKn5DK2C",
    "name": "Amelia",
    "description": "Enthusiastic and Expressive"
  },
  {
    "id": "iCrDUkL56s3C8sCRl7wb",
    "name": "Johnny Kid",
    "description": "Serious and Calm Narrator"
  },
  {
    "id": "1hlpeD1ydbI2ow0Tt3EW",
    "name": "Hope",
    "description": "Poetic, Romantic and Captivating"
  },
  {
    "id": "wJqPPQ618aTW29mptyoc",
    "name": "Olivia",
    "description": "Smooth, Warm and Engaging"
  },
  {
    "id": "EiNlNiXeDU1pqqOPrYMO",
    "name": "Ana Rita",
    "description": "Smooth, Expressive and Bright"
  },
  {
    "id": "FUfBrNit0NNZAwb58KWH",
    "name": "John Doe",
    "description": "Deep"
  },
  {
    "id": "4YYIPFl9wE5c4L2eu2Gb",
    "name": "Angela",
    "description": "Conversational and Friendly"
  },
  {
    "id": "OYWwCdDHouzDwiZJWOOu",
    "name": "Burt Reynolds™",
    "description": "Deep, Smooth and clear"
  },
  {
    "id": "6F5Zhi321D3Oq7v1oNT4",
    "name": "David",
    "description": "Gruff Cowboy"
  },
  {
    "id": "qNkzaJoHLLdpvgh5tISm",
    "name": "Hank",
    "description": "Deep and Engaging Narrator"
  },
  {
    "id": "YXpFCvM1S3JbWEJhoskW",
    "name": "Carter",
    "description": "Rich, Smooth and Rugged"
  },
  {
    "id": "9PVP7ENhDskL0KYHAKtD",
    "name": "Wyatt",
    "description": "Wise Rustic Cowboy"
  },
  {
    "id": "LG95yZDEHg6fCZdQjLqj",
    "name": "Jerry B.",
    "description": "Southern/Cowboy"
  },
  {
    "id": "CeNX9CMwmxDxUF5Q2Inm",
    "name": "Phil",
    "description": "Explosive, Passionate Announcer"
  },
  {
    "id": "st7NwhTPEzqo2riw7qWC",
    "name": "Johnny Dynamite",
    "description": "Vintage Radio DJ"
  },
  {
    "id": "aD6riP1btT197c6dACmy",
    "name": "Blondie",
    "description": "Radio Host"
  },
  {
    "id": "FF7KdobWPaiR0vkcALHF",
    "name": "Rachel M",
    "description": "Pro British Radio Presenter"
  },
  {
    "id": "mtrellq69YZsNwzUSyXh",
    "name": "David",
    "description": "Movie Trailer Narrator"
  },
  {
    "id": "dHd5gvgSOzSfduK4CvEg",
    "name": "Rex Thunder",
    "description": "Deep N Tough"
  },
  {
    "id": "cTNP6ZM2mLTKj2BFhxEh",
    "name": "Ed",
    "description": "Late Night Announcer"
  },
  {
    "id": "eVItLK1UvXctxuaRV2Oq",
    "name": "Paul French",
    "description": "Podcaster"
  },
  {
    "id": "U1Vk2oyatMdYs096Ety7",
    "name": "Jean",
    "description": "Alluring and Playful Femme Fatale"
  },
  {
    "id": "esy0r39YPLQjOczyOib8",
    "name": "Michael",
    "description": "Deep, Dark and Urban"
  },
  {
    "id": "bwCXcoVxWNYMlC6Esa8u",
    "name": "Britney",
    "description": "Calm and Calculative Villain"
  },
  {
    "id": "D2jw4N9m4xePLTQ3IHjU",
    "name": "Matthew Schmitz",
    "description": "Gravel, Deep Anti-Hero"
  },
  {
    "id": "Tsns2HvNFKfGiNjllgqo",
    "name": "Ian",
    "description": "Strange and Distorted Alien"
  },
  {
    "id": "Atp5cNFg1Wj5gyKD7HWV",
    "name": "Sven",
    "description": "Emotional and Nice"
  },
  {
    "id": "1cxc5c3E9K6F1wlqOJGV",
    "name": "Natasha",
    "description": "Gentle Meditation"
  },
  {
    "id": "1U02n4nD6AdIZ9CjF053",
    "name": "Emily",
    "description": "Gentile, Soft and Meditative"
  },
  {
    "id": "HgyIHe81F3nXywNwkraY",
    "name": "Viraj",
    "description": "Smooth and Gentle"
  },
  {
    "id": "AeRdCCKzvd23BpJoofzx",
    "name": "Nate",
    "description": "Sultry, Whispery and Seductive"
  },
  {
    "id": "LruHrtVF6PSyGItzMNHS",
    "name": "Nathaniel",
    "description": "Engaging, British and Calm"
  },
  {
    "id": "Qggl4b0xRMiqOwhPtVWT",
    "name": "Benjamin",
    "description": "Deep, Warm, Calming"
  },
  {
    "id": "zA6D7RyKdc2EClouEMkP",
    "name": "Clara",
    "description": "Relaxing, Calm and Soothing"
  },
  {
    "id": "1wGbFxmAM3Fgw63G1zZJ",
    "name": "AImee",
    "description": "Tranquil ASMR and Meditation"
  },
  {
    "id": "hqfrgApggtO1785R4Fsn",
    "name": "Allison",
    "description": "Calm, Soothing and Meditative"
  },
  {
    "id": "sH0WdfE5fsKuM2otdQZr",
    "name": "Theodore HQ",
    "description": "Serene and Grounded"
  },
  {
    "id": "MJ0RnG71ty4LH3dvNfSd",
    "name": "Koraly",
    "description": "Soft-spoken and Gentle"
  },
  {
    "id": "Sm1seazb4gs7RSlUVw7c",
    "name": "Leon",
    "description": "Soothing and Grounded"
  }
];
const _sfc_main = {
  __name: "ElevenLabsTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const elevenlabsPathToTab = {
      "/home/elevenlabs/multilingual-v2": "multilingual-v2",
      "/home/elevenlabs/turbo-2-5": "turbo-2-5",
      "/home/elevenlabs/speech-to-text": "speech-to-text",
      "/home/elevenlabs/sound-effect-v2": "sound-effect-v2",
      "/home/elevenlabs/audio-isolation": "audio-isolation"
    };
    const { showError } = useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const batchUploadUrl = useBatchUploadUrl();
    const getAuthToken = () => {
      return null;
    };
    const uploadAudioToUrl = async (file) => {
      var _a, _b, _c;
      if (!file) return "";
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const headers = { Accept: "application/json" };
      const authToken = getAuthToken();
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
      const response = await fetch(batchUploadUrl, {
        method: "POST",
        headers,
        body: formDataUpload,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = typeof (errorData == null ? void 0 : errorData.errorMessage) === "string" && ((_a = errorData.errorMessage) == null ? void 0 : _a.trim()) ? errorData.errorMessage.trim() : typeof (errorData == null ? void 0 : errorData.message) === "string" && ((_b = errorData.message) == null ? void 0 : _b.trim()) ? errorData.message.trim() : (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || (errorData == null ? void 0 : errorData.message) || "Upload failed";
        throw new Error(msg);
      }
      const data = await response.json();
      const urls = ((_c = data == null ? void 0 : data.data) == null ? void 0 : _c.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls) || !urls[0]) throw new Error("Invalid response: file URL not found");
      return urls[0];
    };
    const formData = reactive({
      function: "multilingual-v2",
      // 文本转语音相关
      model: "",
      // 将根据 function 自动设置
      voice: "",
      // 使用文档中的选项：Rachel, Aria, Roger 等
      text: "",
      voiceSettings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0,
        speed: 1
      },
      timestamps: false,
      previous_text: "",
      next_text: "",
      language_code: "",
      // Multilingual v2 / Turbo 2.5
      outputFormat: "mp3_44100_128",
      // 语音转文本相关
      language: "auto",
      speakerIdentification: false,
      audioEvents: false,
      uploadedSpeechFile: null,
      // 音效生成相关
      soundDescription: "",
      duration: 5,
      loop: false,
      intensity: 0.5,
      // 音频分离相关
      isolationType: "vocals",
      isolationStrength: 0.8,
      uploadedIsolationFile: null
    });
    const functionOptions = ref([
      {
        id: "multilingual-v2",
        name: "Multilingual v2",
        description: "Multilingual Voice Synthesis",
        detailDescription: "AI voice synthesis supporting 100+ languages, suitable for international content creation, high-quality multilingual voice generation tool",
        icon: "fas fa-globe"
      },
      {
        id: "turbo-2-5",
        name: "Turbo 2.5",
        description: "Fast Voice Synthesis",
        detailDescription: "Optimized for speed, 3x faster generation speed, suitable for real-time applications and batch processing, efficient AI voice synthesis tool",
        icon: "fas fa-bolt"
      },
      {
        id: "speech-to-text",
        name: "Speech-to-Text",
        description: "AI Speech Recognition",
        detailDescription: "High-precision speech recognition, supports multiple audio formats, maximum 200MB, supports speaker identification and audio event marking",
        icon: "fas fa-keyboard"
      },
      {
        id: "sound-effect-v2",
        name: "Sound Effect v2",
        description: "AI Sound Effect Generation",
        detailDescription: "AI-driven sound effect generation, supports loop playback, duration control, multiple output formats, suitable for games, video production",
        icon: "fas fa-volume-up"
      },
      {
        id: "audio-isolation",
        name: "AI Audio Isolation",
        description: "Intelligently isolate vocals and background music",
        detailDescription: "Intelligently isolate vocals and background music, supports multiple audio formats, maximum 10MB, suitable for audio post-processing",
        icon: "fas fa-cut"
      }
    ]);
    const voiceDropdownOpen = ref(false);
    const voiceDropdownRef = ref(null);
    const playingVoiceId = ref(null);
    let voiceDropdownClickOutside = null;
    watch(voiceDropdownOpen, (open) => {
      if (voiceDropdownClickOutside) {
        (void 0).removeEventListener("click", voiceDropdownClickOutside);
        voiceDropdownClickOutside = null;
      }
      if (open) {
        voiceDropdownClickOutside = (e) => {
          if (voiceDropdownRef.value && !voiceDropdownRef.value.contains(e.target)) {
            voiceDropdownOpen.value = false;
          }
        };
        setTimeout(() => (void 0).addEventListener("click", voiceDropdownClickOutside), 0);
      }
    });
    watch(() => formData.function, (newFunction) => {
      const modelMap = {
        "multilingual-v2": "elevenlabs_text_to_speech_multilingual",
        "turbo-2-5": "elevenlabs_text_to_speech_turbo",
        "speech-to-text": "elevenlabs_speech_to_text",
        "sound-effect-v2": "elevenlabs_sound_effect",
        "audio-isolation": "elevenlabs_audio_isolation"
      };
      formData.model = modelMap[newFunction] || "";
    }, { immediate: true });
    const speechFileUrl = ref("");
    const isolationFileUrl = ref("");
    const isUploadingSpeech = ref(false);
    const isUploadingIsolation = ref(false);
    const result = ref(null);
    watch(() => route.path, (path) => {
      const tab = elevenlabsPathToTab[path];
      if (tab && formData.function !== tab) {
        formData.function = tab;
        result.value = null;
      }
    }, { immediate: true });
    const isGenerating = ref(false);
    ref(false);
    ref(0);
    ref(0);
    ref(0);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(false);
    const soundEffectPlaying = ref(false);
    const isolationPlaying = ref(false);
    const textToSpeechPlaying = ref(false);
    ref(0);
    const soundEffectCurrentTime = ref(0);
    const isolationCurrentTime = ref(0);
    const textToSpeechCurrentTime = ref(0);
    ref(0);
    const soundEffectDuration = ref(0);
    const isolationDuration = ref(0);
    const textToSpeechDuration = ref(0);
    ref(0);
    const soundEffectProgress = ref(0);
    const isolationProgress = ref(0);
    const textToSpeechProgress = ref(0);
    const voicePreviewLoading = ref(false);
    ref(null);
    const canGenerate = computed(() => {
      if (formData.function === "multilingual-v2" || formData.function === "turbo-2-5") {
        return formData.text.trim().length > 0 && (formData.voice || "").trim().length > 0;
      } else if (formData.function === "speech-to-text") {
        return !!speechFileUrl.value;
      } else if (formData.function === "sound-effect-v2") {
        return formData.soundDescription.trim().length > 0;
      } else if (formData.function === "audio-isolation") {
        return !!isolationFileUrl.value;
      }
      return false;
    });
    const getConfigTitle = () => {
      const titles = {
        "multilingual-v2": "Text-to-Speech Multilingual v2 Configuration",
        "turbo-2-5": "Text-to-Speech Turbo 2.5 Configuration",
        "speech-to-text": "Speech-to-Text Configuration",
        "sound-effect-v2": "Sound Effect v2 Configuration",
        "audio-isolation": "AI Audio Isolation Configuration"
      };
      return titles[formData.function] || "Configuration";
    };
    const getButtonIcon = () => {
      const icons = {
        "multilingual-v2": "fas fa-globe",
        "turbo-2-5": "fas fa-bolt",
        "speech-to-text": "fas fa-keyboard",
        "sound-effect-v2": "fas fa-volume-up",
        "audio-isolation": "fas fa-cut"
      };
      return icons[formData.function] || "fas fa-play";
    };
    const getButtonText = () => {
      const texts = {
        "multilingual-v2": "Generate Speech",
        "turbo-2-5": "Generate Speech",
        "speech-to-text": "Start Recognition",
        "sound-effect-v2": "Generate Sound Effect",
        "audio-isolation": "Start Isolation"
      };
      return texts[formData.function] || "Generate";
    };
    const getButtonLoadingText = () => {
      const texts = {
        "multilingual-v2": "Generating...",
        "turbo-2-5": "Generating...",
        "speech-to-text": "Recognizing...",
        "sound-effect-v2": "Generating...",
        "audio-isolation": "Isolating..."
      };
      return texts[formData.function] || "Generating...";
    };
    const getButtonLabel = () => {
      const price = getButtonPrice();
      if (!price) return getButtonText();
      return `${getButtonText()} · ${price}`;
    };
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const creditsUnitMap = {
      "multilingual-v2": "/ 1K",
      "turbo-2-5": "/ 1K",
      "speech-to-text": "/ min",
      "sound-effect-v2": "/ min",
      "audio-isolation": "/ min"
    };
    const fallbackCreditsMap = {
      "multilingual-v2": 20,
      "turbo-2-5": 10,
      "speech-to-text": 6,
      "sound-effect-v2": 18,
      "audio-isolation": 21
    };
    const getButtonPrice = () => {
      const keyMap = {
        "multilingual-v2": "elevenlabs_text_to_speech_multilingual",
        "turbo-2-5": "elevenlabs_text_to_speech_turbo",
        "speech-to-text": "elevenlabs_speech_to_text",
        "sound-effect-v2": "elevenlabs_sound_effect",
        "audio-isolation": "elevenlabs_audio_isolation"
      };
      const modelKey = keyMap[formData.function];
      if (!modelKey) return "";
      const credits = getPrice(modelKey);
      const effectiveCredits = credits != null ? credits : fallbackCreditsMap[formData.function];
      const str = formatCredits(effectiveCredits);
      if (!str) return "";
      const unit = creditsUnitMap[formData.function] || "";
      return `${str} credits${unit}${discountText.value}`;
    };
    const getEmptyStateIcon = () => {
      const icons = {
        "multilingual-v2": "fas fa-globe",
        "turbo-2-5": "fas fa-bolt",
        "speech-to-text": "fas fa-keyboard",
        "sound-effect-v2": "fas fa-volume-up",
        "audio-isolation": "fas fa-cut"
      };
      return icons[formData.function] || "fas fa-play";
    };
    const getEmptyStateTitle = () => {
      const titles = {
        "multilingual-v2": "No speech generated yet",
        "turbo-2-5": "No speech generated yet",
        "speech-to-text": "No recognition result yet",
        "sound-effect-v2": "No sound effect generated yet",
        "audio-isolation": "No isolation result yet"
      };
      return titles[formData.function] || "No Result Yet";
    };
    const getEmptyStateDescription = () => {
      const descriptions = {
        "multilingual-v2": 'Enter text and click "Generate Speech" to start synthesis',
        "turbo-2-5": 'Enter text and click "Generate Speech" to start synthesis',
        "speech-to-text": 'Upload audio file and click "Start Recognition"',
        "sound-effect-v2": 'Enter sound effect description and click "Generate Sound Effect"',
        "audio-isolation": 'Upload audio file and click "Start Isolation"'
      };
      return descriptions[formData.function] || "Start Using";
    };
    const getVoiceOptionLabel = (v) => {
      if (!v.description || v.description.trim() === "") return v.name;
      return `${v.name} – ${v.description}`;
    };
    const selectedVoiceLabel = computed(() => {
      if (!formData.voice) return "Select voice";
      const v = elevenlabsVoices.find((x) => x.id === formData.voice);
      return v ? getVoiceOptionLabel(v) : formData.voice;
    });
    const getVoiceName = (voiceId) => {
      if (!voiceId) return "Unknown Voice";
      const v = elevenlabsVoices.find((item) => item.id === voiceId);
      return v ? v.name : voiceId;
    };
    const getIsolationTypeName = (type) => {
      const typeMap = {
        "vocals": "Vocals Isolation",
        "instrumental": "Background Music Isolation",
        "drums": "Drums Isolation",
        "bass": "Bass Isolation",
        "other": "Other Instruments Isolation"
      };
      return typeMap[type] || "Audio Isolation";
    };
    const handleSpeechAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        speechFileUrl.value = "";
        formData.uploadedSpeechFile = null;
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      formData.uploadedSpeechFile = file;
      isUploadingSpeech.value = true;
      try {
        speechFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        speechFileUrl.value = "";
        formData.uploadedSpeechFile = null;
      } finally {
        isUploadingSpeech.value = false;
      }
    };
    const handleIsolationAudioUpdate = async (files) => {
      if (!files || Array.isArray(files) && files.length === 0) {
        isolationFileUrl.value = "";
        formData.uploadedIsolationFile = null;
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      formData.uploadedIsolationFile = file;
      isUploadingIsolation.value = true;
      try {
        isolationFileUrl.value = await uploadAudioToUrl(file);
      } catch (e) {
        showError(e.message || "Failed to upload audio");
        isolationFileUrl.value = "";
        formData.uploadedIsolationFile = null;
      } finally {
        isUploadingIsolation.value = false;
      }
    };
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const displayResult = computed(() => {
      var _a, _b, _c;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2) {
        const d = detailData.value;
        const od = d.originalData || {};
        if ((_b = d.outputUrls) == null ? void 0 : _b.length) {
          const audioUrl = typeof d.outputUrls[0] === "string" ? d.outputUrls[0] : (_c = d.outputUrls[0]) == null ? void 0 : _c.url;
          return { ...od, audioUrl, transcript: d.transcript ?? od.transcript };
        }
        if ((d.model === "elevenlabs_speech_to_text" || d.model === "speech_to_text") && d.outputResults) {
          return {
            ...od,
            transcript: d.outputResults.text || "",
            outputResults: d.outputResults,
            audioUrl: od.audioUrl || od.audio_url
          };
        }
      }
      return result.value;
    });
    const speechToTextDetailResult = computed(() => {
      var _a, _b, _c;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_b = detailData.value) == null ? void 0 : _b.outputResults)) return detailData.value.outputResults;
      if ((_c = displayResult.value) == null ? void 0 : _c.outputResults) return displayResult.value.outputResults;
      return null;
    });
    const sttWordsList = computed(() => {
      var _a, _b, _c;
      const words = ((_a = speechToTextDetailResult.value) == null ? void 0 : _a.words) || ((_c = (_b = displayResult.value) == null ? void 0 : _b.outputResults) == null ? void 0 : _c.words) || [];
      return Array.isArray(words) ? words : [];
    });
    const sttTimelineDuration = computed(() => {
      if (!sttWordsList.value.length) return 0;
      return Math.max(...sttWordsList.value.map((w) => Number(w.end) || 0), 0);
    });
    const sttRulerTicks = computed(() => {
      const d = sttTimelineDuration.value;
      if (d <= 0) return [];
      const step = d <= 10 ? 1 : d <= 60 ? 5 : 10;
      const ticks = [];
      for (let t = 0; t <= Math.ceil(d); t += step) ticks.push(t);
      return ticks;
    });
    function formatRulerTick(t) {
      return Number(t) === parseInt(t, 10) ? t + "s" : Number(t).toFixed(1) + "s";
    }
    const sttResultAudioUrl = computed(() => {
      var _a;
      return detailOriginalAudioUrl.value || ((_a = displayResult.value) == null ? void 0 : _a.audioUrl) || "";
    });
    ref(null);
    const detailOriginalAudioUrl = computed(() => {
      var _a;
      if (!isDetailView.value || formData.function !== "speech-to-text") return "";
      const od = (_a = detailData.value) == null ? void 0 : _a.originalData;
      if (od == null ? void 0 : od.audioUrl) return od.audioUrl;
      return speechFileUrl.value || "";
    });
    const detailIsolationOriginalAudioUrl = computed(() => {
      var _a;
      if (!isDetailView.value || formData.function !== "audio-isolation") return "";
      const od = (_a = detailData.value) == null ? void 0 : _a.originalData;
      if (od == null ? void 0 : od.audioUrl) return od.audioUrl;
      return isolationFileUrl.value || "";
    });
    const isolationOutputUrls = computed(() => {
      var _a, _b;
      if (isDetailView.value && ((_b = (_a = detailData.value) == null ? void 0 : _a.outputUrls) == null ? void 0 : _b.length)) {
        return detailData.value.outputUrls.map((u) => typeof u === "string" ? u : u == null ? void 0 : u.url).filter(Boolean);
      }
      const dr = displayResult.value;
      if (dr == null ? void 0 : dr.audioUrl) return [dr.audioUrl];
      if (Array.isArray(dr == null ? void 0 : dr.outputUrls) && dr.outputUrls.length) return dr.outputUrls.map((u) => typeof u === "string" ? u : u == null ? void 0 : u.url).filter(Boolean);
      return [];
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      Object.keys(formData).forEach((k) => {
        if (o[k] !== void 0 && k in formData) formData[k] = o[k];
      });
      if (o.voiceSettings && typeof o.voiceSettings === "object") Object.assign(formData.voiceSettings, o.voiceSettings);
      if (o.function) formData.function = o.function;
      if (o.model === "elevenlabs_speech_to_text" || o.model === "speech_to_text") formData.function = "speech-to-text";
      if (o.model === "elevenlabs_sound_effect") formData.function = "sound-effect-v2";
      if (o.model === "elevenlabs_audio_isolation") formData.function = "audio-isolation";
      if (o.languageCode !== void 0) {
        formData.language = o.languageCode;
        formData.language_code = o.languageCode;
      }
      if (o.diarize !== void 0) formData.speakerIdentification = !!o.diarize;
      if (o.tagAudioEvents !== void 0) formData.audioEvents = !!o.tagAudioEvents;
      if (o.previousText !== void 0) formData.previous_text = o.previousText;
      if (o.nextText !== void 0) formData.next_text = o.nextText;
      if (o.audioUrl) {
        if (formData.function === "speech-to-text" || o.model === "elevenlabs_speech_to_text" || o.model === "speech_to_text") speechFileUrl.value = o.audioUrl;
        if (formData.function === "audio-isolation" || o.model === "elevenlabs_audio_isolation") isolationFileUrl.value = o.audioUrl;
      }
      if (o.text !== void 0) formData.soundDescription = o.text;
      if (o.durationSeconds !== void 0) formData.duration = Number(o.durationSeconds);
      if (o.promptInfluence !== void 0) formData.intensity = Number(o.promptInfluence);
      if (o.loop !== void 0) formData.loop = !!o.loop;
      if (o.outputFormat !== void 0) formData.outputFormat = o.outputFormat;
    }
    function getRouteRecordId() {
      return route.query["record-id"] || "";
    }
    async function loadDetailByRecordId(recordId) {
      if (!recordId) return;
      if (getRouteRecordId() !== recordId) return;
      if (loadingRecordId.value === recordId) return;
      loadingRecordId.value = recordId;
      detailData.value = null;
      try {
        const data = await fetchRecordDetailOnce(recordId);
        if (getRouteRecordId() !== recordId) return;
        detailData.value = data || null;
        if (data == null ? void 0 : data.originalData) fillFormFromOriginalData(data.originalData);
        if (data != null && Number(data.status) === 1) {
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
          }).catch(() => {
          });
        }
      } catch (e) {
        console.error("Load record detail failed:", e);
      } finally {
        if (loadingRecordId.value === recordId) loadingRecordId.value = null;
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else {
        loadingRecordId.value = null;
        detailData.value = null;
      }
    }, { immediate: true });
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "elevenlabs-tool" }, _attrs))} data-v-e1ee8db8><div class="tool-header" data-v-e1ee8db8><div class="tool-avatar" data-v-e1ee8db8><img${ssrRenderAttr("src", _imports_0)} alt="ElevenLabs" data-v-e1ee8db8></div><div class="tool-details" data-v-e1ee8db8><h3 data-v-e1ee8db8>ElevenLabs</h3><p data-v-e1ee8db8>The most natural and expressive voice generation tool. Whether it&#39;s creators, publishers, or developers, they can easily generate high-quality voice content for videos, audiobooks, games, or applications using our technology.</p></div></div><div class="mode-tabs-wrap" data-v-e1ee8db8><div class="mode-tabs" data-v-e1ee8db8><!--[-->`);
      ssrRenderList(functionOptions.value, (func) => {
        _push(`<div class="${ssrRenderClass([{ active: formData.function === func.id }, "mode-tab"])}" data-v-e1ee8db8><i class="${ssrRenderClass(func.icon)}" data-v-e1ee8db8></i><span data-v-e1ee8db8>${ssrInterpolate(func.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-e1ee8db8><div class="config-panel" data-v-e1ee8db8><div class="config-header" data-v-e1ee8db8><h4 data-v-e1ee8db8>${ssrInterpolate(getConfigTitle())}</h4></div><form class="config-form" data-v-e1ee8db8><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-e1ee8db8>`);
      if (formData.function === "multilingual-v2" || formData.function === "turbo-2-5") {
        _push(`<!--[--><div class="form-group" data-v-e1ee8db8><label class="form-label" data-v-e1ee8db8>Voice <span class="required" data-v-e1ee8db8>*</span></label><div class="voice-dropdown" data-v-e1ee8db8><button type="button" class="${ssrRenderClass([{ open: voiceDropdownOpen.value }, "voice-dropdown-trigger"])}" data-v-e1ee8db8><span class="voice-trigger-label" data-v-e1ee8db8>${ssrInterpolate(selectedVoiceLabel.value)}</span><i class="fas fa-chevron-down voice-trigger-arrow" data-v-e1ee8db8></i></button><div class="voice-dropdown-panel" style="${ssrRenderStyle(voiceDropdownOpen.value ? null : { display: "none" })}" data-v-e1ee8db8><!--[-->`);
        ssrRenderList(unref(elevenlabsVoices), (v) => {
          _push(`<div class="${ssrRenderClass([{ active: formData.voice === v.id }, "voice-option"])}" data-v-e1ee8db8><span class="voice-option-label" data-v-e1ee8db8>${ssrInterpolate(getVoiceOptionLabel(v))}</span><button type="button" class="voice-option-play"${ssrRenderAttr("title", "Play " + v.name)}${ssrIncludeBooleanAttr(voicePreviewLoading.value && playingVoiceId.value === v.id) ? " disabled" : ""} data-v-e1ee8db8>`);
          if (voicePreviewLoading.value && playingVoiceId.value === v.id) {
            _push(`<i class="fas fa-spinner fa-spin" data-v-e1ee8db8></i>`);
          } else {
            _push(`<i class="fas fa-volume-up" data-v-e1ee8db8></i>`);
          }
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div><div class="form-hint" data-v-e1ee8db8> Required. Select a voice for speech generation. Click the speaker icon to play a sample. </div></div><div class="form-group" data-v-e1ee8db8><label for="text" class="form-label" data-v-e1ee8db8>Text to Synthesize *</label><textarea id="text" class="form-input" rows="6" placeholder="Enter the text content to convert to speech..." maxlength="5000" required data-v-e1ee8db8>${ssrInterpolate(formData.text)}</textarea><div class="form-hint" data-v-e1ee8db8> Supports multilingual text, max 5000 characters </div><div class="char-count" data-v-e1ee8db8>${ssrInterpolate(formData.text.length)}/5000 </div></div><div class="form-group" data-v-e1ee8db8><label for="voice-settings" class="form-label" data-v-e1ee8db8>Voice Settings</label><div class="voice-settings" data-v-e1ee8db8><div class="setting-item" data-v-e1ee8db8><label for="stability" class="setting-label" data-v-e1ee8db8> Stability (${ssrInterpolate(formData.voiceSettings.stability.toFixed(2))}) </label><input id="stability"${ssrRenderAttr("value", formData.voiceSettings.stability)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-e1ee8db8><div class="slider-labels" data-v-e1ee8db8><span data-v-e1ee8db8>Variable (0)</span><span data-v-e1ee8db8>Stable (1)</span></div></div><div class="setting-item" data-v-e1ee8db8><label for="similarity-boost" class="setting-label" data-v-e1ee8db8> Similarity Boost (${ssrInterpolate(formData.voiceSettings.similarity_boost.toFixed(2))}) </label><input id="similarity-boost"${ssrRenderAttr("value", formData.voiceSettings.similarity_boost)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-e1ee8db8><div class="slider-labels" data-v-e1ee8db8><span data-v-e1ee8db8>Low (0)</span><span data-v-e1ee8db8>High (1)</span></div></div><div class="setting-item" data-v-e1ee8db8><label for="style" class="setting-label" data-v-e1ee8db8> Style (${ssrInterpolate(formData.voiceSettings.style.toFixed(2))}) </label><input id="style"${ssrRenderAttr("value", formData.voiceSettings.style)} type="range" min="0" max="1" step="0.01" class="form-slider" data-v-e1ee8db8><div class="slider-labels" data-v-e1ee8db8><span data-v-e1ee8db8>Natural (0)</span><span data-v-e1ee8db8>Dramatic (1)</span></div></div><div class="setting-item" data-v-e1ee8db8><label for="speed" class="setting-label" data-v-e1ee8db8> Speed (${ssrInterpolate(formData.voiceSettings.speed.toFixed(2))}) </label><input id="speed"${ssrRenderAttr("value", formData.voiceSettings.speed)} type="range" min="0.7" max="1.2" step="0.01" class="form-slider" data-v-e1ee8db8><div class="slider-labels" data-v-e1ee8db8><span data-v-e1ee8db8>Slow (0.7)</span><span data-v-e1ee8db8>Fast (1.2)</span></div><div class="form-hint" data-v-e1ee8db8> Values below 1.0 slow down speech, above 1.0 speed it up. Extreme values may affect quality. </div></div><div class="setting-item" data-v-e1ee8db8><label class="checkbox-label" for="timestamps" data-v-e1ee8db8><input id="timestamps"${ssrIncludeBooleanAttr(Array.isArray(formData.timestamps) ? ssrLooseContain(formData.timestamps, null) : formData.timestamps) ? " checked" : ""} type="checkbox" data-v-e1ee8db8><span class="checkmark" data-v-e1ee8db8></span> Return Timestamps </label><div class="form-hint" data-v-e1ee8db8> Whether to return timestamps for each word in the generated speech </div></div></div></div><div class="form-group" data-v-e1ee8db8><label class="form-label" data-v-e1ee8db8>Context Text (Optional)</label><div class="form-group" style="${ssrRenderStyle({ "margin-bottom": "12px" })}" data-v-e1ee8db8><label for="previous-text" class="form-label" data-v-e1ee8db8>Previous Text</label><textarea id="previous-text" class="form-input" rows="2" placeholder="Text that came before the current request" maxlength="5000" data-v-e1ee8db8>${ssrInterpolate(formData.previous_text)}</textarea><div class="form-hint" data-v-e1ee8db8> Optional. Can be used to improve speech continuity when concatenating multiple generations. Max 5000 characters. </div><div class="char-count" data-v-e1ee8db8>${ssrInterpolate(formData.previous_text.length)}/5000 </div></div><div class="form-group" style="${ssrRenderStyle({ "margin-bottom": "0" })}" data-v-e1ee8db8><label for="next-text" class="form-label" data-v-e1ee8db8>Next Text</label><textarea id="next-text" class="form-input" rows="2" placeholder="Text that comes after the current request" maxlength="5000" data-v-e1ee8db8>${ssrInterpolate(formData.next_text)}</textarea><div class="form-hint" data-v-e1ee8db8> Optional. Can be used to improve speech continuity when concatenating multiple generations. Max 5000 characters. </div><div class="char-count" data-v-e1ee8db8>${ssrInterpolate(formData.next_text.length)}/5000 </div></div></div>`);
        if (formData.function === "multilingual-v2" || formData.function === "turbo-2-5") {
          _push(`<div class="form-group" data-v-e1ee8db8><label for="language-code" class="form-label" data-v-e1ee8db8>Language Code</label><input id="language-code"${ssrRenderAttr("value", formData.language_code)} type="text" class="form-input" placeholder="e.g.: en, zh, ja" maxlength="500" data-v-e1ee8db8><div class="form-hint" data-v-e1ee8db8> Optional. Language code (ISO 639-1) to enforce a language for the model. </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-e1ee8db8><label for="output-format" class="form-label" data-v-e1ee8db8>Output Format</label><div class="select-with-arrow" data-v-e1ee8db8><select id="output-format" class="form-input" data-v-e1ee8db8><option value="mp3_44100_128" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_128") : ssrLooseEqual(formData.outputFormat, "mp3_44100_128")) ? " selected" : ""}>MP3 (44.1kHz, 128kbps)</option><option value="mp3_44100_192" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_192") : ssrLooseEqual(formData.outputFormat, "mp3_44100_192")) ? " selected" : ""}>MP3 (44.1kHz, 192kbps)</option><option value="mp3_44100_320" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_320") : ssrLooseEqual(formData.outputFormat, "mp3_44100_320")) ? " selected" : ""}>MP3 (44.1kHz, 320kbps)</option><option value="pcm_16000" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_16000") : ssrLooseEqual(formData.outputFormat, "pcm_16000")) ? " selected" : ""}>PCM (16kHz)</option><option value="pcm_22050" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_22050") : ssrLooseEqual(formData.outputFormat, "pcm_22050")) ? " selected" : ""}>PCM (22.05kHz)</option><option value="pcm_24000" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_24000") : ssrLooseEqual(formData.outputFormat, "pcm_24000")) ? " selected" : ""}>PCM (24kHz)</option><option value="pcm_44100" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_44100") : ssrLooseEqual(formData.outputFormat, "pcm_44100")) ? " selected" : ""}>PCM (44.1kHz)</option></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-e1ee8db8></i></div><div class="form-hint" data-v-e1ee8db8> Select audio output format and quality </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "speech-to-text") {
        _push(`<!--[--><div class="form-group" data-v-e1ee8db8><label class="form-label" data-v-e1ee8db8> Upload Audio File <span class="required" data-v-e1ee8db8>*</span></label>`);
        if (isUploadingSpeech.value) {
          _push(`<span class="form-hint" data-v-e1ee8db8>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "speech-audio-upload",
          label: "Upload audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 200MB",
          "additional-hint": "Upload audio file to recognize, supports multiple formats",
          "theme-color": "#6366f1",
          "max-file-size": 200 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleSpeechAudioUpdate
        }, null, _parent));
        if (isDetailView.value && detailOriginalAudioUrl.value) {
          _push(`<div class="detail-audio-replay" data-v-e1ee8db8><label class="form-label detail-audio-label" data-v-e1ee8db8>Original Audio</label><div class="detail-audio-wrap" data-v-e1ee8db8><audio controls class="detail-audio-player"${ssrRenderAttr("src", detailOriginalAudioUrl.value)} data-v-e1ee8db8></audio></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-e1ee8db8><label for="language" class="form-label" data-v-e1ee8db8>Language</label><div class="select-with-arrow" data-v-e1ee8db8><select id="language" class="form-input" data-v-e1ee8db8><option value="auto" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "auto") : ssrLooseEqual(formData.language, "auto")) ? " selected" : ""}>Auto Detect</option><option value="en" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "en") : ssrLooseEqual(formData.language, "en")) ? " selected" : ""}>English</option><option value="zh" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "zh") : ssrLooseEqual(formData.language, "zh")) ? " selected" : ""}>Chinese</option><option value="ja" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "ja") : ssrLooseEqual(formData.language, "ja")) ? " selected" : ""}>Japanese</option><option value="ko" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "ko") : ssrLooseEqual(formData.language, "ko")) ? " selected" : ""}>Korean</option><option value="es" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "es") : ssrLooseEqual(formData.language, "es")) ? " selected" : ""}>Spanish</option><option value="fr" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "fr") : ssrLooseEqual(formData.language, "fr")) ? " selected" : ""}>French</option><option value="de" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "de") : ssrLooseEqual(formData.language, "de")) ? " selected" : ""}>German</option><option value="it" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "it") : ssrLooseEqual(formData.language, "it")) ? " selected" : ""}>Italian</option><option value="pt" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "pt") : ssrLooseEqual(formData.language, "pt")) ? " selected" : ""}>Portuguese</option><option value="ru" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.language) ? ssrLooseContain(formData.language, "ru") : ssrLooseEqual(formData.language, "ru")) ? " selected" : ""}>Russian</option></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-e1ee8db8></i></div><div class="form-hint" data-v-e1ee8db8> Select the main language of the audio, or use auto detect </div></div><div class="form-group" data-v-e1ee8db8><label class="checkbox-label" for="speaker-identification" data-v-e1ee8db8><input id="speaker-identification"${ssrIncludeBooleanAttr(Array.isArray(formData.speakerIdentification) ? ssrLooseContain(formData.speakerIdentification, null) : formData.speakerIdentification) ? " checked" : ""} type="checkbox" data-v-e1ee8db8><span class="checkmark" data-v-e1ee8db8></span> Enable Speaker Identification </label><div class="form-hint" data-v-e1ee8db8> Identify and label different speakers </div></div><div class="form-group" data-v-e1ee8db8><label class="checkbox-label" for="audio-events" data-v-e1ee8db8><input id="audio-events"${ssrIncludeBooleanAttr(Array.isArray(formData.audioEvents) ? ssrLooseContain(formData.audioEvents, null) : formData.audioEvents) ? " checked" : ""} type="checkbox" data-v-e1ee8db8><span class="checkmark" data-v-e1ee8db8></span> Mark Audio Events </label><div class="form-hint" data-v-e1ee8db8> Mark audio events like music, noise, silence, etc. </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "sound-effect-v2") {
        _push(`<!--[--><div class="form-group" data-v-e1ee8db8><label for="sound-description" class="form-label" data-v-e1ee8db8>Sound Description *</label><textarea id="sound-description" class="form-input" rows="4" placeholder="Describe the sound effect you want, e.g.: rain, footsteps, doorbell..." maxlength="5000" required data-v-e1ee8db8>${ssrInterpolate(formData.soundDescription)}</textarea><div class="form-hint" data-v-e1ee8db8> Describe the sound effect characteristics and usage in detail </div><div class="char-count" data-v-e1ee8db8>${ssrInterpolate(formData.soundDescription.length)}/5000 </div></div><div class="form-group" data-v-e1ee8db8><label for="duration" class="form-label" data-v-e1ee8db8>Sound Duration (seconds)</label><input id="duration"${ssrRenderAttr("value", formData.duration)} type="number" class="form-input" placeholder="e.g.: 5" min="0.5" max="22" step="0.5" data-v-e1ee8db8><div class="form-hint" data-v-e1ee8db8> Duration of the sound effect, 0.5–22 seconds </div></div><div class="form-group" data-v-e1ee8db8><label class="checkbox-label" for="loop" data-v-e1ee8db8><input id="loop"${ssrIncludeBooleanAttr(Array.isArray(formData.loop) ? ssrLooseContain(formData.loop, null) : formData.loop) ? " checked" : ""} type="checkbox" data-v-e1ee8db8><span class="checkmark" data-v-e1ee8db8></span> Loop </label><div class="form-hint" data-v-e1ee8db8> Generate seamlessly loopable sound effects </div></div><div class="form-group" data-v-e1ee8db8><label for="intensity" class="form-label" data-v-e1ee8db8> Sound Intensity (${ssrInterpolate(formData.intensity)}) </label><input id="intensity"${ssrRenderAttr("value", formData.intensity)} type="range" min="0" max="1" step="0.1" class="form-slider" data-v-e1ee8db8><div class="slider-labels" data-v-e1ee8db8><span data-v-e1ee8db8>Soft (0)</span><span data-v-e1ee8db8>Intense (1)</span></div></div><div class="form-group" data-v-e1ee8db8><label for="sound-effect-output-format" class="form-label" data-v-e1ee8db8>Output Format</label><div class="select-with-arrow" data-v-e1ee8db8><select id="sound-effect-output-format" class="form-input" data-v-e1ee8db8><option value="mp3_44100_128" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_128") : ssrLooseEqual(formData.outputFormat, "mp3_44100_128")) ? " selected" : ""}>MP3 (44.1kHz, 128kbps)</option><option value="mp3_44100_192" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_192") : ssrLooseEqual(formData.outputFormat, "mp3_44100_192")) ? " selected" : ""}>MP3 (44.1kHz, 192kbps)</option><option value="mp3_44100_320" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "mp3_44100_320") : ssrLooseEqual(formData.outputFormat, "mp3_44100_320")) ? " selected" : ""}>MP3 (44.1kHz, 320kbps)</option><option value="pcm_16000" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_16000") : ssrLooseEqual(formData.outputFormat, "pcm_16000")) ? " selected" : ""}>PCM (16kHz)</option><option value="pcm_22050" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_22050") : ssrLooseEqual(formData.outputFormat, "pcm_22050")) ? " selected" : ""}>PCM (22.05kHz)</option><option value="pcm_24000" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_24000") : ssrLooseEqual(formData.outputFormat, "pcm_24000")) ? " selected" : ""}>PCM (24kHz)</option><option value="pcm_44100" data-v-e1ee8db8${ssrIncludeBooleanAttr(Array.isArray(formData.outputFormat) ? ssrLooseContain(formData.outputFormat, "pcm_44100") : ssrLooseEqual(formData.outputFormat, "pcm_44100")) ? " selected" : ""}>PCM (44.1kHz)</option></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-e1ee8db8></i></div><div class="form-hint" data-v-e1ee8db8> Optional. Output format of the generated audio (codec_sample_rate_bitrate). </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.function === "audio-isolation") {
        _push(`<div class="form-group" data-v-e1ee8db8><label class="form-label" data-v-e1ee8db8> Upload Audio File <span class="required" data-v-e1ee8db8>*</span></label>`);
        if (isUploadingIsolation.value) {
          _push(`<span class="form-hint" data-v-e1ee8db8>Uploading audio...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadAudio, {
          "input-id": "isolation-audio-upload",
          label: "Upload audio file",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload audio file",
          "upload-hint": "Supports MP3, WAV, M4A formats, max 10MB",
          "additional-hint": "Upload audio file to isolate",
          "theme-color": "#6366f1",
          "max-file-size": 10 * 1024 * 1024,
          multiple: false,
          "onUpdate:files": handleIsolationAudioUpdate
        }, null, _parent));
        if (isDetailView.value && detailIsolationOriginalAudioUrl.value) {
          _push(`<div class="detail-audio-replay" data-v-e1ee8db8><label class="form-label detail-audio-label" data-v-e1ee8db8>Original Audio</label><div class="detail-audio-wrap" data-v-e1ee8db8><audio controls class="detail-audio-player"${ssrRenderAttr("src", detailIsolationOriginalAudioUrl.value)} data-v-e1ee8db8></audio></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="generate-btn"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-e1ee8db8>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-e1ee8db8></i>`);
      } else {
        _push(`<i class="${ssrRenderClass(getButtonIcon())}" data-v-e1ee8db8></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? getButtonLoadingText() : getButtonLabel())}</button></fieldset></form></div><div class="result-panel" data-v-e1ee8db8><div class="result-header" data-v-e1ee8db8><h4 data-v-e1ee8db8>Generation Result</h4>`);
      if (!isDetailView.value && displayResult.value) {
        _push(`<div class="result-actions" data-v-e1ee8db8><button class="action-btn" title="Download" data-v-e1ee8db8><i class="fas fa-download" data-v-e1ee8db8></i></button><button class="action-btn" title="Share" data-v-e1ee8db8><i class="fas fa-share" data-v-e1ee8db8></i></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-content" data-v-e1ee8db8>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-e1ee8db8><div class="failure-icon" data-v-e1ee8db8><i class="fas fa-exclamation-circle" data-v-e1ee8db8></i></div><p class="failure-message" data-v-e1ee8db8>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-e1ee8db8><i class="fas fa-spinner fa-spin detail-spinner" data-v-e1ee8db8></i><p data-v-e1ee8db8>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-e1ee8db8><i class="${ssrRenderClass(getEmptyStateIcon())}" data-v-e1ee8db8></i><p data-v-e1ee8db8>${ssrInterpolate(getEmptyStateTitle())}</p><span data-v-e1ee8db8>${ssrInterpolate(getEmptyStateDescription())}</span></div>`);
      } else {
        _push(`<div class="result-display" data-v-e1ee8db8>`);
        if (formData.function === "multilingual-v2" || formData.function === "turbo-2-5") {
          _push(`<div class="speech-result" data-v-e1ee8db8><div class="speech-player" data-v-e1ee8db8><div class="speech-info" data-v-e1ee8db8><h5 data-v-e1ee8db8>${ssrInterpolate(getVoiceName(formData.voiceId))}</h5><p data-v-e1ee8db8>${ssrInterpolate(formData.function === "multilingual-v2" ? "Multilingual v2" : "Turbo 2.5")}</p><div class="speech-meta" data-v-e1ee8db8><span data-v-e1ee8db8><i class="fas fa-clock" data-v-e1ee8db8></i> ${ssrInterpolate(displayResult.value.duration || "Unknown Duration")}</span><span data-v-e1ee8db8><i class="fas fa-file-audio" data-v-e1ee8db8></i> ${ssrInterpolate(displayResult.value.format || "MP3")}</span></div></div><div class="player-controls" data-v-e1ee8db8><button class="play-btn" data-v-e1ee8db8><i class="${ssrRenderClass(textToSpeechPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-e1ee8db8></i></button><div class="progress-bar" data-v-e1ee8db8><div class="progress" style="${ssrRenderStyle({ width: textToSpeechProgress.value + "%" })}" data-v-e1ee8db8></div></div><span class="time" data-v-e1ee8db8>${ssrInterpolate(formatTime(textToSpeechCurrentTime.value))} / ${ssrInterpolate(formatTime(textToSpeechDuration.value))}</span></div></div><audio${ssrRenderAttr("src", displayResult.value.audioUrl)} data-v-e1ee8db8></audio></div>`);
        } else if ((formData.function === "speech-to-text" || isDetailView.value && (((_a = detailData.value) == null ? void 0 : _a.model) === "elevenlabs_speech_to_text" || ((_b = detailData.value) == null ? void 0 : _b.model) === "speech_to_text")) && (((_c = displayResult.value) == null ? void 0 : _c.transcript) != null || speechToTextDetailResult.value)) {
          _push(`<div class="text-result" data-v-e1ee8db8><div class="text-content" data-v-e1ee8db8><h5 data-v-e1ee8db8>Recognition Result</h5><div class="transcript transcript-block" data-v-e1ee8db8>${ssrInterpolate((((_d = speechToTextDetailResult.value) == null ? void 0 : _d.text) ?? ((_e = displayResult.value) == null ? void 0 : _e.transcript)) || "No transcript")}</div>`);
          if (sttWordsList.value.length) {
            _push(`<div class="words-list" data-v-e1ee8db8><h6 data-v-e1ee8db8>Words Timeline</h6><div class="timeline-scroll-wrap" data-v-e1ee8db8><div class="timeline-inner" data-v-e1ee8db8>`);
            if (sttTimelineDuration.value > 0) {
              _push(`<div class="timeline-ruler-single" data-v-e1ee8db8><!--[-->`);
              ssrRenderList(sttRulerTicks.value, (t) => {
                _push(`<span class="ruler-tick" style="${ssrRenderStyle({ left: t / sttTimelineDuration.value * 100 + "%" })}" data-v-e1ee8db8>${ssrInterpolate(formatRulerTick(t))}</span>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="timeline-bar timeline-bar-nowrap" data-v-e1ee8db8><!--[-->`);
            ssrRenderList(sttWordsList.value, (w, idx) => {
              _push(`<!--[-->`);
              if (w.type === "word") {
                _push(`<span class="timeline-segment timeline-word"${ssrRenderAttr("title", `${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`)} data-v-e1ee8db8>${ssrInterpolate(w.text)}</span>`);
              } else if (w.type === "spacing") {
                _push(`<span class="timeline-segment timeline-spacing"${ssrRenderAttr("title", `${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`)} data-v-e1ee8db8> </span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (((_f = speechToTextDetailResult.value) == null ? void 0 : _f.language_code) || ((_h = (_g = displayResult.value) == null ? void 0 : _g.outputResults) == null ? void 0 : _h.language_code)) {
            _push(`<div class="stt-meta" data-v-e1ee8db8><span data-v-e1ee8db8>Language: ${ssrInterpolate(((_i = speechToTextDetailResult.value) == null ? void 0 : _i.language_code) ?? ((_k = (_j = displayResult.value) == null ? void 0 : _j.outputResults) == null ? void 0 : _k.language_code))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (sttResultAudioUrl.value) {
            _push(`<audio${ssrRenderAttr("src", sttResultAudioUrl.value)} class="stt-result-audio" data-v-e1ee8db8></audio>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else if (formData.function === "sound-effect-v2") {
          _push(`<div class="sound-effect-result" data-v-e1ee8db8><div class="sound-player" data-v-e1ee8db8><div class="sound-info" data-v-e1ee8db8><h5 data-v-e1ee8db8>${ssrInterpolate(formData.soundDescription)}</h5><p data-v-e1ee8db8>Generated Sound Effect</p><div class="sound-meta" data-v-e1ee8db8><span data-v-e1ee8db8><i class="fas fa-clock" data-v-e1ee8db8></i> ${ssrInterpolate(displayResult.value.duration || "Unknown Duration")}</span><span data-v-e1ee8db8><i class="fas fa-volume-up" data-v-e1ee8db8></i> Sound Effect</span></div></div><div class="player-controls" data-v-e1ee8db8><button class="play-btn" data-v-e1ee8db8><i class="${ssrRenderClass(soundEffectPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-e1ee8db8></i></button><div class="progress-bar" data-v-e1ee8db8><div class="progress" style="${ssrRenderStyle({ width: soundEffectProgress.value + "%" })}" data-v-e1ee8db8></div></div><span class="time" data-v-e1ee8db8>${ssrInterpolate(formatTime(soundEffectCurrentTime.value))} / ${ssrInterpolate(formatTime(soundEffectDuration.value))}</span></div></div><audio${ssrRenderAttr("src", displayResult.value.audioUrl)} data-v-e1ee8db8></audio></div>`);
        } else if ((formData.function === "audio-isolation" || isDetailView.value && ((_l = detailData.value) == null ? void 0 : _l.model) === "elevenlabs_audio_isolation") && isolationOutputUrls.value.length) {
          _push(`<div class="isolation-result" data-v-e1ee8db8><div class="isolation-player" data-v-e1ee8db8><div class="isolation-info" data-v-e1ee8db8><h5 data-v-e1ee8db8>${ssrInterpolate(getIsolationTypeName(formData.isolationType))}</h5><p data-v-e1ee8db8>Isolation Result</p><div class="isolation-meta" data-v-e1ee8db8><span data-v-e1ee8db8><i class="fas fa-cut" data-v-e1ee8db8></i> ${ssrInterpolate(formData.isolationType || "Isolated")}</span></div></div><div class="player-controls" data-v-e1ee8db8><button class="play-btn" data-v-e1ee8db8><i class="${ssrRenderClass(isolationPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-e1ee8db8></i></button><div class="progress-bar" data-v-e1ee8db8><div class="progress" style="${ssrRenderStyle({ width: isolationProgress.value + "%" })}" data-v-e1ee8db8></div></div><span class="time" data-v-e1ee8db8>${ssrInterpolate(formatTime(isolationCurrentTime.value))} / ${ssrInterpolate(formatTime(isolationDuration.value))}</span></div></div><audio${ssrRenderAttr("src", isolationOutputUrls.value[0])} data-v-e1ee8db8></audio>`);
          if (isolationOutputUrls.value.length > 1) {
            _push(`<div class="isolation-extra-outputs" data-v-e1ee8db8><!--[-->`);
            ssrRenderList(isolationOutputUrls.value, (url, i) => {
              _push(`<!--[-->`);
              if (i > 0) {
                _push(`<div class="isolation-extra-item" data-v-e1ee8db8><span class="isolation-extra-label" data-v-e1ee8db8>Output ${ssrInterpolate(i + 1)}</span><audio controls class="isolation-extra-audio"${ssrRenderAttr("src", url)} data-v-e1ee8db8></audio></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-e1ee8db8><div class="tip-item" data-v-e1ee8db8><span class="tip-icon" data-v-e1ee8db8>🎤</span><span data-v-e1ee8db8>Text-to-Speech: Supports multiple languages and voice styles, adjustable stability, similarity and style parameters</span></div><div class="tip-item" data-v-e1ee8db8><span class="tip-icon" data-v-e1ee8db8>📝</span><span data-v-e1ee8db8>Speech-to-Text: High-precision speech recognition with speaker identification and audio event marking</span></div><div class="tip-item" data-v-e1ee8db8><span class="tip-icon" data-v-e1ee8db8>🎵</span><span data-v-e1ee8db8>Sound Effect Generation: AI-driven sound effect generation with loop playback and duration control</span></div><div class="tip-item" data-v-e1ee8db8><span class="tip-icon" data-v-e1ee8db8>✂️</span><span data-v-e1ee8db8>AI Audio Isolation: Intelligently isolate vocals and background music</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/ElevenLabsTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ElevenLabsTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1ee8db8"]]);
export {
  ElevenLabsTool as E
};
//# sourceMappingURL=ElevenLabsTool-BQXprj-C.js.map
