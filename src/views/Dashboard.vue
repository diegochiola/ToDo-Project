<script setup>
import { storeToRefs } from 'pinia'
import NavBarComponent from '../components/NavBarComponent.vue'
import UpdateTaskComponent from '../components/task/UpdateTaskComponent.vue'
import NewTaskComponent from '../components/task/NewTaskComponent.vue'
import ShowTasksComponent from '../components/task/ShowTasksComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ShowProfileComponent from '../components/profile/ShowProfileComponent.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue'

const showNewTaskComponent = ref(true)
const selectedTaskId = ref(null)
const updateTaskComponent = ref(null)

import { useUserStore } from './../stores/user.js'
const userStore = useUserStore()

function handleEditTask(taskId) {
  selectedTaskId.value = Number(taskId)
  console.log(selectedTaskId.value)
  showNewTaskComponent.value = false
  if (updateTaskComponent.value) {
    updateTaskComponent.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
function handleUpdateTaskComplete() {
  selectedTaskId.value = null
  //showNewTaskComponent.value = true
  setTimeout(() => {
    showNewTaskComponent.value = true
  }, 2000)
}
</script>

<template>
    <NavBarComponent />

    <section>
      <div class="dashboard-container">
        <div class="dashboard">
          <h1>Welcome to</h1>
          <img src="../assets/taskList_logo_color.png" alt="tasklist logo" />
        </div>
        <p class="slogan">Nice to have you here again.</p>
      </div>
    </section>

    <ShowProfileComponent :showContent="false" />
    <section>
      <article v-if="showNewTaskComponent">
        <NewTaskComponent class="newTaskcomponent" />
      </article>
      <article ref="updateTaskComponent" v-else>
        <UpdateTaskComponent
          :taskId="selectedTaskId"
          @update-task-complete="handleUpdateTaskComplete"
        />
      </article>
      <ShowTasksComponent class="update-task-component" @edit-task="handleEditTask" />
    </section>
    <FooterComponent />
</template>

<style scoped>
h1 {
  color: var(--purple-dark);
}

.dashboard-container {
  padding: 40px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.newTaskcomponent {
  margin-top: 60px;
  margin-bottom: 60px;
}
.update-task-component {
  margin-top: 60px;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}
img {
  width: 130px;
  height: auto;
}
.slogan {
  font-size: 12px;
}
@media only screen and (max-width: 768px) {
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-size: 18px;
    text-align: center;
  }
  .dashboard img {
    width: 80px;
    height: auto;
  }
  .slogan {
    font-size: 14px;
    text-align: center;
  }
}
</style>
