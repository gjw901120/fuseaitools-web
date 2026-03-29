import { readonly, ref } from "vue";
const globalToasts = ref([]);
let globalToastId = 0;
const useToast = () => {
  const toasts = globalToasts;
  const showToast = (message, type = "error", duration = 3e3) => {
    if (!message) {
      console.warn("Toast message is empty");
      return;
    }
    const id = ++globalToastId;
    const toast = {
      id,
      message,
      type,
      duration
    };
    globalToasts.value.push(toast);
    console.log("Toast added:", toast, "Total toasts:", globalToasts.value.length);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  };
  const removeToast = (id) => {
    const index = globalToasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      globalToasts.value.splice(index, 1);
    }
  };
  const showError = (message, duration = 3e3) => {
    return showToast(message, "error", duration);
  };
  const showSuccess = (message, duration = 3e3) => {
    return showToast(message, "success", duration);
  };
  const showWarning = (message, duration = 3e3) => {
    return showToast(message, "warning", duration);
  };
  const showInfo = (message, duration = 3e3) => {
    return showToast(message, "info", duration);
  };
  const clearAll = () => {
    globalToasts.value = [];
  };
  return {
    toasts: readonly(toasts),
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    removeToast,
    clearAll
  };
};
export {
  useToast as u
};
//# sourceMappingURL=useToast-CATlmXE8.js.map
