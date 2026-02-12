// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }

// src/app/layout.js

import Layout from "@/components/globalComponent/layout/layout";
import "./globals.css";
import { ThemeProvider } from "./provider/theme-provider";

export const metadata = {
  title: {
    default: "Orcary ",
    template: "%s | Orcary",
  },
  description: "Watch and share amazing videos on Orcary",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="background" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
