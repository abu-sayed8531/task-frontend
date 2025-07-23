<script setup>

import { useRoute, useRouter } from 'vue-router';
import { ref, onBeforeMount} from 'vue';
import { useTaskStore } from '../../stores/taskStore';
import apiClient from '../../services/axiosClient';
const taskStore  = useTaskStore();
const route = useRoute();
const router = useRouter();
const title = ref();
const description = ref();
const status = ref();

//load the existing task 
onBeforeMount(async ()=>{
   let id = route.params.id;
   const task = await taskStore.getTaskById(id);
   title.value = task.title;
   description.value = task.description;
   status.value = task.status;
}); 
async function updateTask(){
    if(!title.value.trim()||!description.value.trim()||!status.value.trim()){
        alert('All field required');
    }
    let id = route.params.id;
   let update = await taskStore.updateTask(id,{title: title.value,description: description.value,status:status.value});
    title.value = '';
    description.value = '';
    status.value = '';
    if(update){
        router.push({name:'summary'});
    } 
}

</script>

<template>
  <div class="content-body container-fluid">
    <div class="d-flex justify-content-center row">
      <div class="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
        <div class="card">
          <div class="card-body">
            <h4>Update Task</h4>

            <br />
            <input
              placeholder="Task Name"
              class="form-control animated fadeInUp"
              type="text"
              v-model="title"
            />

            <br />
            <textarea
              rows="5"
              placeholder="Task Description"
              class="form-control animated fadeInUp"
              v-model="description"
            ></textarea>

            <br />
            <select class="form-control animated fadeInUp" v-model="status">
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancel">Canceled</option>
            </select>

            <br />
            <button @click="updateTask" class="btn float-end btn-success mt-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
