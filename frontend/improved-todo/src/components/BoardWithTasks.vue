<script>
import { axios_utils } from '../axios_utils'
import TaskItem from './TaskItem.vue'

export default {

    components: {
        TaskItem
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
            axios_utils.getTeam(this.user, this.board.teamId).then(
                result => {
                    this.team = result.data
                },
                error => {console.log(error)}
            )
        },
        fetchTasks() {
            axios_utils.getTasks(this.user, this.board.teamId, this.board.id).then(
                result => {
                    this.tasks = result.data
                },
                error => {console.log(error)}
            )
        },
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
            return [...this.tasks].sort()
        },
    },
}

</script>

<template><div>
    <div class="workspace-path" v-if="team">
        {{this.team.name + ' / ' + this.board.name}}
    </div>
    <TaskItem
        v-if="this.tasks"
        v-for="task in allMyTasks"
        v-bind:task="task"
        v-bind:user="this.user"
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


</style>