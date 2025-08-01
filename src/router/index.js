import { createRouter, createWebHistory } from 'vue-router';
import routeConfig from './routeConfig.json';
import routeGuard from './routeGuard.js';
import { useAuthStore } from '@/stores/useAuthStore.js';

const routes = routeConfig.map(route => {
  if (route.redirect) return { path: route.slug, redirect: route.redirect };

  return {
    path: route.slug,
    component: async () => {
      const auth = useAuthStore();
      const role = auth.simulate?.role || auth.currentUser?.role;
      const override = route.customComponentPath?.[role]?.componentPath;
      const finalPath = override || route.componentPath;
      if (!finalPath) return import('@/views/components/NotFound.vue');
      try {
        return await import(/* @vite-ignore */ finalPath);
      } catch {
        return import('@/views/components/NotFound.vue');
      }
    },
    meta: {
      requiresAuth: route.requiresAuth,
      supportedRoles: route.supportedRoles || [],
      dependencies: route.dependencies || {},
      redirectIfNotAuth: route.redirectIfNotAuth,
      redirectIfLoggedIn: route.redirectIfLoggedIn,
      inheritConfigFromParent: route.inheritConfigFromParent || false,
      dynamicRoute: route.dynamicRoute || false
    }
  };
});

const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach(routeGuard);
export default router;