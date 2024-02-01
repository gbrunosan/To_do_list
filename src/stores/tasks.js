import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks',{
  state: ()=> ({
    tasksList:[]
}),
  actions:{
    addToTasksList(data){
    this.tasksList.unshift(data)  
  },
    removeTask(i){
      this.tasksList.splice(i,1)
    }
}
});
