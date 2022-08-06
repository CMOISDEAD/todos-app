export const useColorscheme = (obj) => {
  const { mode, colorscheme } = obj;
  let colors = {};

  if (mode === "dark") {
    // All dark colorschemes
    if (colorscheme === "gruvbox") {
      colors = {
        background: "#282828",
        foreground: "#fbf1c7",
        green: "#98971a",
        blue: "#458588",
        red: "#cc241d",
        gray: "#928374",
        background_hard: "#1d2021",
        foreground_hard: "#a88984",
        black: "#000000",
        white: "#ffffff",
      };
    } else if (colorscheme === "solarized") {
      colors = {
        background: "#073642",
        foreground: "#fdf6e3",
        green: "#859900",
        blue: "#268bd2",
        red: "#dc322f",
        gray: "#839496",
        background_hard: "#002b36",
        foreground_hard: "#93a1a1",
        black: "#000000",
        white: "#ffffff",
      };
    } else {
      colors = {
        background: "#262626",
        foreground: "#ffffff",
        green: "#98971a",
        blue: "#458588",
        red: "#cc241d",
        gray: "#7c6f64",
        background_hard: "#282828",
        foreground_hard: "#ffffff",
        black: "#ffffff",
        white: "#000000",
      };
    }
  } else {
    // All light colorschemes
    if (colorscheme === "gruvbox") {
      colors = {
        background: "#fbf1c7",
        foreground: "#3c3836",
        green: "#98971a",
        blue: "#458588",
        red: "#cc241d",
        gray: "#7c6f64",
        background_hard: "#f9f5d7",
        foreground_hard: "#282828",
        black: "#ffffff",
        white: "#000000",
      };
    } else if (colorscheme === "solarized") {
      colors = {
        background: "#fdf6e3",
        foreground: "#073642",
        green: "#859900",
        blue: "#268bd2",
        red: "#dc322f",
        gray: "#839496",
        background_hard: "#93a1a1",
        foreground_hard: "#002b36",
        black: "#000000",
        white: "#ffffff",
      };
    } else {
      colors = {
        background: "#ffffff",
        foreground: "#262626",
        green: "#98971a",
        blue: "#458588",
        red: "#cc241d",
        gray: "#7c6f64",
        background_hard: "#ffffff",
        foreground_hard: "#282828",
        black: "#ffffff",
        white: "#000000",
      };
    }
  }

  return colors;
};
