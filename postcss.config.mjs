// O PostCSS processa o CSS do projeto; aqui ele só ativa o Tailwind CSS.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
