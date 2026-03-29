import { a as useRuntimeConfig } from './nitro.mjs';
import { getHeader } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';

function getEffectiveApiBase(event) {
  const config = useRuntimeConfig();
  let apiBase = config.public.apiBase || "";
  let host = (getHeader(event, "host") || getHeader(event, "x-forwarded-host") || "").split(":")[0].toLowerCase();
  if (!host && getHeader(event, "referer")) {
    try {
      const u = new URL(getHeader(event, "referer"));
      host = u.hostname.toLowerCase();
    } catch (_) {
    }
  }
  const isProductionDomain = host === "www.fuseaitools.com" || host === "fuseaitools.com";
  if (isProductionDomain && (!apiBase || apiBase.includes("127.0.0.1"))) {
    return "https://api.fuseaitools.com/api";
  }
  if (!apiBase) {
    return "http://127.0.0.1:8080/api";
  }
  return apiBase;
}

export { getEffectiveApiBase as g };
//# sourceMappingURL=getApiBase.mjs.map
