import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.edvyntra.app',
  appName: 'EDVYNTRA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
