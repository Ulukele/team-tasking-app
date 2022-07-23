<script>
export default {

    data() {
        return {
            creatingNew: false,
            newTaskTitle: null,
        }
    },

    methods: {
        clearForm() {
            this.newTaskTitle = null
        },
        initCreation() { this.creatingNew = true },
        cancelCreation() {
            this.creatingNew = false
            this.clearForm()
        },
        submitCreation() {
            this.$emit('createNew', {title: this.newTaskTitle})
            this.clearForm()
        },
    }
}
</script>

<template>
<div v-if="creatingNew" class="new-task-item">
    <input v-model="newTaskTitle" class="item-field-input" type="text" placeholder="title">
    <button class="item-field-input" @click="submitCreation"> Ok </button>
    <button class="item-field-input" @click="cancelCreation"> Cancel </button>
</div>
<button v-else @click="initCreation" class="new-task-item">
    create new task!
</button>
</template>

<style>

.new-task-item {
    width: fit-content;
    background: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    margin: 15px;
    padding: 20px 10px 10px 10px;
}

</style>