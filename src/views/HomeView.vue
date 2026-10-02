<template>
  <div>
    <h2>Home</h2>
    <button @click="loadPages">Load Pages</button>
    <ul>
      <li v-for="p in pages" :key="p.id">
        <strong>{{ p.title }}</strong> ({{ p.slug }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pages = ref([]);

async function loadPages() {
  const res = await fetch("/api/pages");
  if (res.ok) {
    pages.value = await res.json();
  }
}
</script>
