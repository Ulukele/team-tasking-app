<script>
import { axios_utils } from '../axios_utils'
import TaskItem from './TaskItem.vue'
import NewTaskItem from './NewTaskItem.vue'

export default {

    components: {
    TaskItem,
    NewTaskItem
},

    props: {
        board: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
    },

    data() {
        return {
            team: null,
            tasks: null,
        }
    },

    methods: {
        fetchTeam() {
            this.userIdToUsername = {}
            axios_utils.getTeam(this.user, this.board.teamId).then(
                result => {
                    this.team = {...result.data}
                    this.team.users.forEach(element => {
                        axios_utils.getUser(element.id, this.user.sessionID).then(
                            res => {element.username = res.data.username}
                        )
                    })

                },
                error => {console.error(error)}
            )
        },
        fetchTasks() {
            axios_utils.getTasks(this.user, this.board.teamId, this.board.id).then(
                result => {
                    this.tasks = [...result.data]
                },
                error => {console.error(error)}
            )
        },
        createNewTask(task) {
            axios_utils.createTask(this.user, this.board.teamId, this.board.id, task).then(
                result => { this.fetchTasks() },
                error => {console.error(error)}
            )
        },
        tryToDeleteTask(task) {
            axios_utils.deleteTask(this.user, this.board.teamId, this.board.id, task.id).then(
                result => { this.fetchTasks() },
                error => {console.error(error)}
            )
        }
    },

    mounted() {
            this.fetchTeam()
            this.fetchTasks()
    },
    watch: {
        board: function(newVal, oldVal) {
            this.fetchTeam()
            this.fetchTasks()
        }
    },
    computed: {
        allMyTasks() {
            return [...this.tasks].sort(function(item1, item2) {
                return item2.importance - item1.importance
            })
        },
    },
}

</script>

<template><div>
    <div class="workspace-path" v-if="team">
        {{this.team.name + ' / ' + this.board.name}}
    </div>
    <div class="tasks-container">
        <TaskItem
            v-if="this.tasks"
            v-for="task in allMyTasks"
            v-bind:task="task"
            v-bind:user="this.user"
            @tryToDelete="tryToDeleteTask"
        />
    </div>
    
    <NewTaskItem
        @createNew="createNewTask"
    />

</div></template>

<style>
.workspace-path {
    width: fit-content;
    margin-top: 15px;
    margin-left: 15px;
    background: white;
    padding: 7px;
    border-radius: 10px;
}

.tasks-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
}


</style>