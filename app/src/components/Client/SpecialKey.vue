<template>
    <p> Your Special Key: {{ clientStore.specialKey }} </p>
</template>

<script setup lang="ts">
import { useClientStore } from '@/stores/Roles/ClientStore';

const clientStore = useClientStore()
</script>