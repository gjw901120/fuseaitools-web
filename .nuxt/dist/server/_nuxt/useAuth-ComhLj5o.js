import { computed, ref, readonly } from "vue";
const globalUser = ref(null);
const globalToken = ref(null);
const useAuth = () => {
  const user = globalUser;
  const token = globalToken;
  const clearAuth = () => {
    user.value = null;
    token.value = null;
  };
  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      const exp = payload.exp;
      if (!exp) return false;
      const expirationTime = exp * 1e3;
      const isExpired = Date.now() >= expirationTime;
      return isExpired;
    } catch (e) {
      return true;
    }
  };
  const parseJWT = (jwtToken) => {
    try {
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };
  const login = (jwtToken) => {
    if (!jwtToken) return false;
    if (isTokenExpired(jwtToken)) {
      console.error("Token is expired");
      return false;
    }
    const payload = parseJWT(jwtToken);
    if (!payload) {
      console.error("Failed to parse token");
      return false;
    }
    token.value = jwtToken;
    user.value = {
      name: payload.name || "",
      avatar: payload.avatar || "",
      email: payload.email || "",
      sub: payload.sub || ""
    };
    return true;
  };
  const logout = () => {
    clearAuth();
  };
  const isAuthenticated = computed(() => {
    if (!user.value || !token.value) return false;
    try {
      return !isTokenExpired(token.value);
    } catch (e) {
      return false;
    }
  });
  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    parseJWT
  };
};
export {
  useAuth as u
};
//# sourceMappingURL=useAuth-ComhLj5o.js.map
