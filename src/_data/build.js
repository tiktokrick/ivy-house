// Netlify sets CONTEXT to "production", "deploy-preview" or "branch-deploy".
export default {
  context: process.env.CONTEXT || "development",
  isProduction: process.env.CONTEXT === "production",
  year: new Date().getFullYear(),
};
