<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted } from 'vue'
import { defineProps, ref, computed, watch } from 'vue'
import { susStore } from '@/stores'
const store = susStore()
interface typeForm {
  cns: string
  src: string
  name: string
  motherName: string
  photo_url: string
  cep: string
  cpf: string
  birthday: string
  adress: {
    city: string
    state: string
    ville: string
    addr: string
  }
}

const props = defineProps({
  mode: String,
  dataForm: Object as PropType<typeForm>
})

const filter = {
  edit: 'Editar Paciente',
  remove: 'Excluir Paciente',
  new: 'Cadastrar novo Paciente',
  read: 'Detalhes do Paciente'
}
const readonly = computed(() => {
  return props.mode === 'read'
})

const setTitle = computed(() => {
  return filter[props.mode as keyof typeof filter]
})

const image = ref<File[]>([])
const file = ref()
const form = ref<typeForm>({
  cns: '',
  src: '',
  name: '',
  motherName: '',
  photo_url: '',
  cep: '',
  cpf: '',
  birthday: '',
  adress: {
    city: '',
    state: '',
    ville: '',
    addr: ''
  }
})
const Preview_image = () => {
  console.log(image.value)
  const img = image.value[0] as Blob | MediaSource
  form.value.photo_url = URL.createObjectURL(img)
}

const getCep = async (cep: string) => {
  await store.getCep(cep)
  form.value.adress = store.adress
}

onMounted(async () => {
  if (props.dataForm) {
    form.value = { ...props.dataForm }
  }
})

watch(
  () => form.value.cep,
  (cep) => {
    form.value.cep = cep.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    if (cep.length === 9) {
      getCep(cep)
    }
  }
)
</script>
<template>
  <v-card>
    <v-card-title class="text-h7 app-ModalTitle text-center">
      {{ setTitle }}
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-container v-if="mode !== 'remove'">
        <v-row>
          <v-col class="text-left" cols="6">
            <label> Foto* </label>
            <v-img :src="form.photo_url" width="100%" height="300px" class="preview"> </v-img>
            <span class="text-left red--text ml-4"> Foto obrigatória </span>
            <div class="upload" v-if="mode !== 'read'">
              <v-btn color="secondary" block @click="file.click()">Adicionar Foto</v-btn>
              <v-file-input
                v-model="image"
                ref="file"
                v-show="false"
                hide-details
                @change="Preview_image"
              >
              </v-file-input>
            </div>
          </v-col>
          <v-col cols="6">
            <v-col class="text-left" cols="12" sm="12" md="12">
              <label> Nome Completo do Paciente*</label>
              <v-text-field v-model="form.name" dense outlined :readonly="readonly"></v-text-field>
            </v-col>
            <v-col class="text-left" cols="12" sm="12" md="12">
              <label> Nome Completo da Mãe*</label>
              <v-text-field
                v-model="form.motherName"
                dense
                outlined
                :readonly="readonly"
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="12" sm="12" md="12">
              <label> Data de Nascimento*</label>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{}">
                  <v-text-field
                    v-model="form.birthday"
                    v-mask="'##/###/###-##'"
                    dense
                    outlined
                    :readonly="readonly"
                  ></v-text-field>
                </template>
                <v-date-picker></v-date-picker>
              </v-menu>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-left" cols="6">
            <label>CPF*</label>
            <v-text-field
              v-model="form.cpf"
              v-mask="'###.###.###-##'"
              dense
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>
          <v-col class="text-left" cols="6">
            <label>CNS*(cartão nacional de saúde)</label>
            <v-text-field v-model="form.cns" dense outlined :readonly="readonly"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-left">
            <h3>Endereço*</h3>
          </v-col>
          <v-col class="text-left" cols="4">
            <label>CEP</label>
            <v-text-field
              v-model="form.cep"
              dense
              max-leng
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>
          <v-col class="text-left" cols="5">
            <label>Cidade</label>
            <v-text-field
              v-model="form.adress.city"
              dense
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>
          <v-col class="text-left" cols="3">
            <label>Estado</label>
            <v-text-field
              v-model="form.adress.state"
              dense
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>
          <v-col class="text-left" cols="6">
            <label>Bairro</label>
            <v-text-field
              v-model="form.adress.ville"
              dense
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>

          <v-col class="text-left" cols="6">
            <label>Endereço</label>
            <v-text-field
              v-model="form.adress.addr"
              dense
              outlined
              :readonly="readonly"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else class="text-left pt-0 pb-13">
        <h3 class="orange--text">Deseja realmente excluir este Registro?</h3>
      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn id="app-btnCancel" color="error" @click="$emit('close')"> Cancelar </v-btn>
      <v-btn :disabled="readonly" class="app-btnSave" color="error" light rounded>
        {{ mode === 'remove' ? 'Excluir' : 'Salvar' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
