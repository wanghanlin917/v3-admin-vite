// vite.config.ts
import { loadEnv } from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///D:/pycharm/githubProject/v3-admin-vite/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\pycharm\\githubProject\\v3-admin-vite";
var vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        "/api/v1": {
          // target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
          target: "http://127.0.0.1:8000",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: mode === "development" ? void 0 : {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxweWNoYXJtXFxcXGdpdGh1YlByb2plY3RcXFxcdjMtYWRtaW4tdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHljaGFybVxcXFxnaXRodWJQcm9qZWN0XFxcXHYzLWFkbWluLXZpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3B5Y2hhcm0vZ2l0aHViUHJvamVjdC92My1hZG1pbi12aXRlL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgVXNlckNvbmZpZ0V4cG9ydCwgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCJcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiXHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiXHJcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCJcclxuXHJcbi8qKiBcdTkxNERcdTdGNkVcdTk4NzlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnICovXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZ0V4cG9ydCA9PiB7XHJcbiAgY29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgYXMgSW1wb3J0TWV0YUVudlxyXG4gIGNvbnN0IHsgVklURV9QVUJMSUNfUEFUSCB9ID0gdml0ZUVudlxyXG4gIHJldHVybiB7XHJcbiAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU2ODM5XHU2MzZFXHU1QjlFXHU5NjQ1XHU2MEM1XHU1MUI1XHU0RkVFXHU2NTM5IGJhc2UgKi9cclxuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLyoqIEAgXHU3QjI2XHU1M0Y3XHU2MzA3XHU1NDExIHNyYyBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvKiogXHU4QkJFXHU3RjZFIGhvc3Q6IHRydWUgXHU2MjREXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IE5ldHdvcmsgXHU3Njg0XHU1RjYyXHU1RjBGXHVGRjBDXHU0RUU1IElQIFx1OEJCRlx1OTVFRVx1OTg3OVx1NzZFRSAqL1xyXG4gICAgICBob3N0OiB0cnVlLCAvLyBob3N0OiBcIjAuMC4wLjBcIlxyXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU1M0Y3ICovXHJcbiAgICAgIHBvcnQ6IDMzMzMsXHJcbiAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjggKi9cclxuICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgIC8qKiBcdThERThcdTU3REZcdThCQkVcdTdGNkVcdTUxNDFcdThCQjggKi9cclxuICAgICAgY29yczogdHJ1ZSxcclxuICAgICAgLyoqIFx1N0FFRlx1NTNFM1x1ODhBQlx1NTM2MFx1NzUyOFx1NjVGNlx1RkYwQ1x1NjYyRlx1NTQyNlx1NzZGNFx1NjNBNVx1OTAwMFx1NTFGQSAqL1xyXG4gICAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgICAgLyoqIFx1NjNBNVx1NTNFM1x1NEVFM1x1NzQwNiAqL1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaS92MVwiOiB7XHJcbiAgICAgICAgICAvLyB0YXJnZXQ6IFwiaHR0cHM6Ly9tb2NrLm1lbmd4dWVndS5jb20vbW9jay82MzIxOGI1ZmI0YzUzMzQ4ZWQyYmMyMTJcIixcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTI3LjAuMC4xOjgwMDBcIixcclxuICAgICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NTE0MVx1OEJCOFx1OERFOFx1NTdERiAqL1xyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvKiogXHU5ODg0XHU3MEVEXHU1RTM4XHU3NTI4XHU2NTg3XHU0RUY2XHVGRjBDXHU2M0QwXHU5QUQ4XHU1MjFEXHU1OUNCXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU5MDFGXHU1RUE2ICovXHJcbiAgICAgIHdhcm11cDoge1xyXG4gICAgICAgIGNsaWVudEZpbGVzOiBbXCIuL3NyYy9sYXlvdXRzLyoqLyoudnVlXCJdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvKiogXHU1MzU1XHU0RTJBIGNodW5rIFx1NjU4N1x1NEVGNlx1NzY4NFx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNyAyMDQ4S0IgXHU2NUY2XHU1M0QxXHU1MUZBXHU4QjY2XHU1NDRBICovXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjA0OCxcclxuICAgICAgLyoqIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QSAqL1xyXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTU0MEVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgYXNzZXRzRGlyOiBcInN0YXRpY1wiLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFx1NTIwNlx1NTc1N1x1N0I1Nlx1NzU2NVxyXG4gICAgICAgICAgICogMS4gXHU2Q0U4XHU2MTBGXHU4RkQ5XHU0RTlCXHU1MzA1XHU1NDBEXHU1RkM1XHU5ODdCXHU1QjU4XHU1NzI4XHVGRjBDXHU1NDI2XHU1MjE5XHU2MjUzXHU1MzA1XHU0RjFBXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgICAgKiAyLiBcdTU5ODJcdTY3OUNcdTRGNjBcdTRFMERcdTYwRjNcdTgxRUFcdTVCOUFcdTRFNDkgY2h1bmsgXHU1MjA2XHU1MjcyXHU3QjU2XHU3NTY1XHVGRjBDXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU3OUZCXHU5NjY0XHU4RkQ5XHU2QkI1XHU5MTREXHU3RjZFXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgICB2dWU6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcclxuICAgICAgICAgICAgZWxlbWVudDogW1wiZWxlbWVudC1wbHVzXCIsIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIl0sXHJcbiAgICAgICAgICAgIHZ4ZTogW1widnhlLXRhYmxlXCIsIFwidnhlLXRhYmxlLXBsdWdpbi1lbGVtZW50XCIsIFwieGUtdXRpbHNcIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKiogXHU2REY3XHU2REM2XHU1NjY4ICovXHJcbiAgICBlc2J1aWxkOlxyXG4gICAgICBtb2RlID09PSBcImRldmVsb3BtZW50XCJcclxuICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgIDoge1xyXG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGNvbnNvbGUubG9nICovXHJcbiAgICAgICAgICAgIHB1cmU6IFtcImNvbnNvbGUubG9nXCJdLFxyXG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGRlYnVnZ2VyICovXHJcbiAgICAgICAgICAgIGRyb3A6IFtcImRlYnVnZ2VyXCJdLFxyXG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0XHU2MjQwXHU2NzA5XHU2Q0U4XHU5MUNBICovXHJcbiAgICAgICAgICAgIGxlZ2FsQ29tbWVudHM6IFwibm9uZVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgLyoqIFZpdGUgXHU2M0QyXHU0RUY2ICovXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgLyoqIFx1NUMwNiBTVkcgXHU5NzU5XHU2MDAxXHU1NkZFXHU4RjZDXHU1MzE2XHU0RTNBIFZ1ZSBcdTdFQzRcdTRFRjYgKi9cclxuICAgICAgc3ZnTG9hZGVyKHsgZGVmYXVsdEltcG9ydDogXCJ1cmxcIiB9KSxcclxuICAgICAgLyoqIFNWRyAqL1xyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvaWNvbnMvc3ZnXCIpXSxcclxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiXHJcbiAgICAgIH0pLFxyXG4gICAgICAvKiogVW5vQ1NTICovXHJcbiAgICAgIFVub0NTUygpXHJcbiAgICBdLFxyXG4gICAgLyoqIFZpdGVzdCBcdTUzNTVcdTUxNDNcdTZENEJcdThCRDVcdTkxNERcdTdGNkVcdUZGMUFodHRwczovL2NuLnZpdGVzdC5kZXYvY29uZmlnICovXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGluY2x1ZGU6IFtcInRlc3RzLyoqLyoudGVzdC50c1wiXSxcclxuICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBZ0QsZUFBZTtBQUMvRCxPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixPQUFPLFlBQVk7QUFSbkIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFtQztBQUN4RCxRQUFNLFVBQVUsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsSUFBSTtBQUM3QixTQUFPO0FBQUE7QUFBQSxJQUVMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLFlBQVk7QUFBQTtBQUFBLE1BRVosT0FBTztBQUFBLFFBQ0wsV0FBVztBQUFBO0FBQUEsVUFFVCxRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUE7QUFBQSxVQUVKLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsUUFBUTtBQUFBLFFBQ04sYUFBYSxDQUFDLHdCQUF3QjtBQUFBLE1BQ3hDO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUEsTUFFTCx1QkFBdUI7QUFBQTtBQUFBLE1BRXZCLHNCQUFzQjtBQUFBO0FBQUEsTUFFdEIsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1OLGNBQWM7QUFBQSxZQUNaLEtBQUssQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLFlBQ2xDLFNBQVMsQ0FBQyxnQkFBZ0IseUJBQXlCO0FBQUEsWUFDbkQsS0FBSyxDQUFDLGFBQWEsNEJBQTRCLFVBQVU7QUFBQSxVQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxTQUNFLFNBQVMsZ0JBQ0wsU0FDQTtBQUFBO0FBQUEsTUFFRSxNQUFNLENBQUMsYUFBYTtBQUFBO0FBQUEsTUFFcEIsTUFBTSxDQUFDLFVBQVU7QUFBQTtBQUFBLE1BRWpCLGVBQWU7QUFBQSxJQUNqQjtBQUFBO0FBQUEsSUFFTixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUE7QUFBQSxNQUVQLFVBQVUsRUFBRSxlQUFlLE1BQU0sQ0FBQztBQUFBO0FBQUEsTUFFbEMscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxlQUFlLENBQUM7QUFBQSxRQUN2RCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQSxNQUVELE9BQU87QUFBQSxJQUNUO0FBQUE7QUFBQSxJQUVBLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxNQUM5QixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
