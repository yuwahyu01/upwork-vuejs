<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div>#10234</div>
    <div>Jane Doe</div>
    <div>2025-07-27</div>
    <div>$150.00</div>
    <div><span class="text-green-600">Paid</span></div>
  </div>
</template>

<script setup>
const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>