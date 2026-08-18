export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
