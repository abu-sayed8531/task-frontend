<script setup>
import { onBeforeMount , computed } from "vue";
import ShimmerLoader from "../ShimmerLoader.vue";
import { useTaskStore } from "../../stores/taskStore";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";



const taskStore = useTaskStore();
//const {tasks} = storeToRefs(taskStore);
const tasks = computed(()=> taskStore.tasks);
onBeforeMount( () => {
    taskStore.getTrashedTasks();
 
});

const forceDeleteTask = async (id) => {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",  
  
}).then((result) => {
  if (result.isConfirmed) {
  const deleted =   taskStore.forceDeleteTask(id);
  if(deleted){
   
    Swal.fire({
      title: "Deleted!",
      text: "Your task has been deleted permanently.",
      icon: "success",
      timer : 1000,
    })
  }
  }
});
  
};

const restoreTask = async (id) => {
  Swal.fire({
  title: "Are you sure?",
  text: "Do you want to restore this task!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, restore it!",  
  
}).then((result) => {
  if (result.isConfirmed) {
  const deleted =    taskStore.restoreTask(id);
  if(deleted){
   
    Swal.fire({
      title: "Restored!",
      text: "Your task has been restored.",
      icon: "success",
      timer : 1000,
    })
  }
  }
});
  
};

</script>

<template>
  <div class="content-body container-fluid">
    <h5>Trashed Tasks</h5>

    <ShimmerLoader :loading="taskStore.loading" :count="8" :lines="1">
      <div class="row">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="col-12 col-md-6 col-lg-4 p-2"
        >
          <div class="card h-100">
            <div class="card-body">
              <h6>{{ task.title }}</h6>
              <p>{{ task.description }}</p>
              <p class="mb-0">
                <!-- Deleted at: {{ new Date(task.deleted_at).toLocaleString() }} -->
                Deleted at: {{ task.deleted_at }}
              </p>
              <button
                @click="forceDeleteTask(task.id)"
                class="btn btn-danger btn-sm mt-2"
              >
                Permanently Delete
              </button>

              <button
                @click="restoreTask(task.id)"
                class="btn btn-success btn-sm mt-2 ms-2"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      </div>
    </ShimmerLoader>
  </div>
</template>
