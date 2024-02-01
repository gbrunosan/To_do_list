<template>
    <div class="fixed inset-0 modal-bg bg-black/50 min-w-screen flex justify-center items-center font-sans shadow min-h-screen mb-2">
        <div class="w-2/5 h-auto rounded shadow-sm min-w-80 max-w-[600px]">
            <div class="w-full flex justify-between items-center px-4 py-3 bg-[#63db8f] rounded-t-lg">
                <h1 class="text-2xl font-semibold text-[#242424]">Nova Tarefa </h1>
                <i class="bx bx-x text-3xl cursor-pointer text-[#242424]" @click="fecharModal"></i>
            </div>
            <form class="modal_content flex flex-col w-full h-2/3 min-h-60 bg-white px-4 py-2">
                <label for="title" class="text-base font-light text-black">Título</label>
                <p v-if="error && form.titulo===''" class="text-[#fa5f61] text-sm flex items-center"><i class='bx bx-error-alt mr-2'></i>Campo Obrigatório!</p>
                <input v-model="form.titulo" id="title" type="text" placeholder="Nomeie sua tarefa" class="text-black focus:outline-none p-4 bg-white border shadow-sm my-2 box-border">
                <label for="description" id="description" class="text-base font-light text-black">Descrição</label>
                <textarea v-model="form.descricao" id="description" type="text" placeholder="Descreva sua tarefa" class="text-black focus:outline-none p-4 bg-white border shadow-sm mt-2 box-border resize-none h-1/2 max-h-36"></textarea>
            </form>
            <div class="flex justify-center items-center bg-white px-4 py-2 rounded-bl-xl">
                <input type="button" value="Salvar" class="bg-[#141414] text-white px-8 py-2 rounded-full border-none cursor-pointer font-semibold hover:bg-[#4e4457]" @click="salvar">
            </div>
        </div>
    </div>
</template>


<script setup>
import {useTaskStore} from '@/stores/tasks'
import { ref, defineEmits, defineProps, watch } from 'vue'

const form = ref({
    titulo:'',
    descricao:''
})

// watch(form.value.titulo,(value)=>{
//     console.log(value);
// })

const { isOpenModal, tasks } = defineProps(['isOpenModal', 'tasks'])

const emit = defineEmits(['closeModal', 'salvarLocalModal'])

const taskStore = useTaskStore()

const error = ref(false)

function fecharModal (){
    console.log('fechar modal')
    emit("closeModal",true)
}

function salvar (){
    if(form.value.titulo !== ""){
        console.log('salvar dados modal')
        taskStore.addToTasksList(form.value)
        emit('salvarLocalModal')
        emit("closeModal",true)
        form.value.titulo = ''
        form.value.descricao = ''
    }else{
        error.value = true  
    }
}
</script>


