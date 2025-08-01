<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center bg-white text-gray-600 px-4">
    <h1 class="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
    <p class="text-xl mb-6">Oops! Halaman tidak ditemukan.</p>
    <router-link
      to="/login"
      class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
    >
      Kembali ke Login
    </router-link>
  </div>
</template>
