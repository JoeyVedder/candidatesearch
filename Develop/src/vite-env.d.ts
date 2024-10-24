interface ImportMetaEnv {
    VITE_GITHUB_TOKEN: string; // Add your GitHub token environment variable
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }