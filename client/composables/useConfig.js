export default function () {
  return useRuntimeConfig();
}

// globalThis.useRuntimeConfig = () => {
//   return {
//     public: {
//       APP_NAME: process.env.APP_NAME,
//       BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
//     },
//   };
// };