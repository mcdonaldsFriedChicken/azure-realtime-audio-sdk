export default {
  input: './realtime-openapi3.yml',
  output: './lib/api',
  plugins: [
    '@hey-api/typescript',
  ],
};
