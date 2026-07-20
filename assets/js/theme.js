(function () {
  const toggle = document.getElementById("theme-toggle");
  const label = toggle?.querySelector(".theme-toggle__label");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

  if (!toggle || !label) return;

  function applyTheme(theme, persist) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    label.textContent = isDark ? "Light mode" : "Dark mode";
    if (themeColor) themeColor.content = isDark ? "#10171f" : "#173b63";

    if (persist) {
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (error) {
        // The selected theme still applies when storage is unavailable.
      }
    }
  }

  applyTheme(document.documentElement.dataset.theme, false);

  toggle.addEventListener("click", function () {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  systemPreference.addEventListener("change", function (event) {
    try {
      if (localStorage.getItem("theme")) return;
    } catch (error) {
      // Follow the system preference when storage is unavailable.
    }
    applyTheme(event.matches ? "dark" : "light", false);
  });
})();
