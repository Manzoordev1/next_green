import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/static/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/static/Inter_18pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const firaCode = localFont({
  src: [
    {
      path: "../public/fonts/FiraCode/woff2/FiraCode-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FiraCode/woff2/FiraCode-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fira-code",
});
