<template>
    <button @click="onBackButton">Go Back</button>
    <CodeInput />
    <RolePicker @role-selected="onRoleSelected"/>
</template>

<script setup lang="ts">
import CodeInput from './CodeInput.vue'
import RolePicker from './RolePicker.vue'

import sharedEnums from "@shared/enums"
import { ref } from "vue"

const roleEnums = sharedEnums.gameRoles

const events = defineEmits(['go-back'])
const roleRef = ref<string>(roleEnums.client)

function onBackButton() { events('go-back') }

function onRoleSelected(role: string) { 
    console.log("Selected role: ", role) 
    roleRef.value = role
}
</script>