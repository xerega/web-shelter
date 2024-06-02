export const useTheme = () => {
  const enabled = useState<boolean | null>("theme", () => null);

  onMounted(() => {
    enabled.value = localStorage.getItem("webshelter-theme") === "dark";
  });

  const toggleTheme = () => {
    enabled.value = !enabled.value;
    localStorage.setItem("webshelter-theme", enabled.value ? "dark" : "light");
    setTheme();
  };

  const setTheme = () => {
    const theme = localStorage.getItem("webshelter-theme");

    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(preferes-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return {
    enabled,
    toggleTheme,
    setTheme,
  };
};
