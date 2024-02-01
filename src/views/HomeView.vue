<script setup>
  import AddTask from '@/components/AddTask.vue'
  import { onMounted, ref } from 'vue'
  import { useTaskStore } from '@/stores/tasks'

  const isOpenModal = ref(false)
  const taskStore = useTaskStore()

  function abrirModal (){
    isOpenModal.value = true
  }

  function deleteTask (index){
    taskStore.removeTask(index)
    salvarLocalStorage()
  }
  
  function salvarLocalStorage() {
    localStorage.setItem('listaDeTarefas', JSON.stringify(taskStore.tasksList))
  }

  onMounted(()=>{
    const dadosSalvos = JSON.parse(localStorage.getItem('listaDeTarefas')) || [];
    console.log('Dados salvos:', dadosSalvos);
    taskStore.tasksList = [...dadosSalvos];
  })
</script>   

<template>
  <main class="font-sans">
    <AddTask v-show="isOpenModal" @closeModal="isOpenModal = false" :tasksList="taskStore.tasksList" @salvarLocalModal="salvarLocalStorage"/>
    <div class="bg-[#28313b] flex flex-col min-h-screen h-auto">                        
      <div class="w-screen h-auto flex flex-col items-center text-[#e6e6e6] my-8">
        <h1 class="font-bold text-3xl mb-2">LISTA DE TAREFAS</h1>
          <div id="divSalvar" class="p-6 w-[40%] min-w-[310px] w-max-3/5 h-auto bg-[#14181c] rounded-md justify-between shadow my-2 hover:animate-pulse cursor-pointer" @click="deleteTask(i)" v-for="(item,i) in taskStore.tasksList" :key="i"> 
            <h1 class="text-[#f0f0f0] text-2xl font-bold text-wrap whitespace-pre-line truncate">{{ item.titulo }}</h1>
            <p class="text-white font-light mt-4 text-sm text-wrap whitespace-pre-line truncate">{{ item.descricao }}</p>
            <div class="flex justify-end">
              <i class='bx bxs-check-circle text-5xl text-[#9cffc3] mt-4 cursor-pointer'></i>
            </div>
          </div>
      </div>               
      <input v-if="!isOpenModal" type="button" value="+" class="fixed left-2/3 bottom-8 bg-[#009aed] text-white font-bold text-3xl w-20 h-20 rounded-full shadow-sm border-none cursor-pointer hover:animate-pulse hover:bg-sky-700" @click="abrirModal()">        
    </div>
  </main>
</template> 