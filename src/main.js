import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/useAuthStore';
import { authHandler } from '@/services/authHandler';
import 'virtual:uno.css'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const auth = useAuthStore();

authHandler.restoreSession()
  .then(({ idToken }) => {
    auth.setTokenAndDecode(idToken)
    auth.startTokenRefreshLoop()
  })

  .catch(() => auth.logout());

app.use(router).mount('#app');