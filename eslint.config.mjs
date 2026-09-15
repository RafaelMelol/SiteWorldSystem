import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Configuração do ESLint (verificação automática de qualidade do código),
// com as regras recomendadas pelo Next.js para React, desempenho e TypeScript.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Arquivos gerados automaticamente, que não precisam ser verificados.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
