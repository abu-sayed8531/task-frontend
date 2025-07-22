import {defineStore} from 'pinia';
import {ref} from 'vue';
import apiClient from '../services/axiosClient';
import Swal from 'sweetalert2';
import cogoToast from 'cogo-toast';


export const useTaskStore = defineStore('task',()=>{
    const tasks = ref([]);
    const loading = ref(false);
    const createTask = async (credentials)=>{
        tasks.value = [];
        try{
               const res = await apiClient.post('/tasks' , credentials);
               console.log(res);
               if(res.data.success){
                   Swal.fire({
                    title : 'Done',
                    text : 'Task created successfully',
                   })
                tasks.value.unshift( res.data);
                   console.log(tasks.value);
               }

        }
        catch(error){
            if(error.response?.data.errors){
                            let errors = error.response.data.errors;
                            for( let field in errors){
                                cogoToast.error(errors[field],{
                                    position: 'bottom-center',
                                });
                            }
                         }
                         else if(error.response?.data.message){
                            cogoToast.error(error.response.data.message,{
                                position : 'bottom-center',
                            })
                         }
                         else if(error.code === 'ERR_NETWORK'){
                                cogoToast.error('Network error',{
                                position : 'bottom-center',
                            })
                         }
                         else{
                            cogoToast.error('There is something wrong',{
                                position : 'bottom-center',
                            }
                            
                            )
                         } 
        }
    }
    const filterByStatus = async (status)=>{
        tasks.value = [];
        loading.value = true
        try{
            const res = await apiClient.post('tasks/filter', status);
             if(res.data.success){
                tasks.value = res.data.data.data;
                
             }
        }
        catch(error){
             if(error.response?.data.errors){
                            let errors = error.response.data.errors;
                            for( let field in errors){
                                cogoToast.error(errors[field],{
                                    position: 'bottom-center',
                                });
                            }
                         }
                         else if(error.response?.data.message){
                            cogoToast.error(error.response.data.message,{
                                position : 'bottom-center',
                            })
                         }
                         else if(error.code === 'ERR_NETWORK'){
                                cogoToast.error('Network error',{
                                position : 'bottom-center',
                            })
                         }
                         else{
                            cogoToast.error('There is something wrong',{
                                position : 'bottom-center',
                            }
                            
                            )
                         } 
        }
        finally{
            loading.value = false;
        }
    }
    //update task
    const updateTask = async (id,credentials)=>{
        try{
               const res = await apiClient.put('/tasks/'+id, credentials);
               let index = tasks.value.indexOf((t)=>{t.id === id}); 
               if(index !== -1) tasks.value[index] = res.data.data;
               return true;
        }
        catch(error){
             if(error.response?.data.errors){
                            let errors = error.response.data.errors;
                            for( let field in errors){
                                cogoToast.error(errors[field],{
                                    position: 'bottom-center',
                                });
                            }
                         }
                         else if(error.response?.data.message){
                            cogoToast.error(error.response.data.message,{
                                position : 'bottom-center',
                            })
                         }
                         else if(error.code === 'ERR_NETWORK'){
                                cogoToast.error('Network error',{
                                position : 'bottom-center',
                            })
                         }
                         else{
                            cogoToast.error('There is something wrong',{
                                position : 'bottom-center',
                            }
                            
                            )
                         }
                         return false;
        }

    }

    const getTaskById = async (id)=>{
        try{
            const res = await apiClient.get('/tasks/'+id);
        
            return res.data.data;
        }
        catch(error){
             if(error.response?.data.errors){
                            let errors = error.response.data.errors;
                            for( let field in errors){
                                cogoToast.error(errors[field],{
                                    position: 'bottom-center',
                                });
                            }
                         }
                         else if(error.response?.data.message){
                            cogoToast.error(error.response.data.message,{
                                position : 'bottom-center',
                            })
                         }
                         else if(error.code === 'ERR_NETWORK'){
                                cogoToast.error('Network error',{
                                position : 'bottom-center',
                            })
                         }
                         else{
                            cogoToast.error('There is something wrong',{
                                position : 'bottom-center',
                            }
                            
                            )
                         }
                         return false;
        }
    }
    const deleteTask = async (id)=>{
        try{
                  const res = await apiClient.delete(`/tasks/${id}`);
                  if(res.data.success){
                    tasks.value = tasks.value.filter((t) => t.id !== id);
                    return true;
                  }
        }
        catch(error){
                if(error.response?.data.message){
                            cogoToast.error(error.response.data.message,{
                                position : 'bottom-center',
                            })
                         }
                         else if(error.code === 'ERR_NETWORK'){
                                cogoToast.error('Network error',{
                                position : 'bottom-center',
                            })
                         }
                         else{
                            cogoToast.error('There is something wrong',{
                                position : 'bottom-center',
                            }
                            
                            )
                         }
                         return false;
        }
    }
    return {createTask,filterByStatus, updateTask, getTaskById, deleteTask, loading, tasks}
});