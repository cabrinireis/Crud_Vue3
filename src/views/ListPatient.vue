<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from 'vue'
import type { Ref } from 'vue'
import appForm from '@/components/FormPatient.vue'
import { susStore } from '@/stores'
import type { PropType } from 'vue'
const store = susStore()
interface DataTableHeader {
  title: string
  key: string
}
interface TypeDataBody {
  name: string
  motherName: string
  phone: number
  actions: string
  id: string
}

const header: DataTableHeader[] = reactive([
  { title: 'Nome do pasciente', key: 'name' },
  { title: 'Nome da mãe', key: 'motherName' },
  { title: 'CPF', key: 'phone' },
  { title: 'Ações', key: 'actions' }
])

const loading: Ref<boolean> = ref(false)

const dialogActive = ref<boolean>(false)

const search = ref<string>('')

const mode = ref<string>('')

const list = computed<TypeDataBody[]>(() => {
  return store.patientList
})

function openModal(typeMode: string) {
  dialogActive.value = !dialogActive.value
  mode.value = typeMode
}

const onGetPatient = async (id: string, mode: string) => {
  try {
    await store.getPatient(id)
    openModal(mode)
  } catch (error) {
    console.log(error)
  }
}

const onUpdate = (id: string, mode: string) => {
  onGetPatient(id, mode)
}
const onRead = (id: string, mode: string) => {
  onGetPatient(id, mode)
}
const onDelete = (mode: string) => {
  openModal(mode)
}

onMounted(async () => {
  await store.getPatients('car')
})

watch(search, (value: string) => {
  store.setSearch(value)
  store.getPatients(value)
})
</script>
<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-btn color="secondary">Cadastrar</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          class="input-search"
          flat
          appendIcon="mdi-magnify"
          label="Buscar..."
          hide-details
          single-line
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th v-for="(item, i) in header" :key="i" class="text-left w-25">{{ item.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="h-auto">
                <v-progress-linear :indeterminate="loading"></v-progress-linear>
              </td>
            </tr>
            <tr v-else v-for="(item, i) in list" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.motherName }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <v-icon @click="onUpdate(item.id, 'edit')">mdi-pencil</v-icon>
                <v-icon class="ml-4" @click="onRead(item.id, 'read')">mdi-eye</v-icon>
                <v-icon class="ml-4" @click="onDelete('remove')">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-if="dialogActive" v-model="dialogActive" width="600" scrollable>
        <appForm :data-form="store.patientId" :mode="mode" @close="dialogActive = false" />
      </v-dialog>
    </v-row>
  </v-container>
</template>
