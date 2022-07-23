<script>
export default {

    props: {
        user: {
            type: Object,
            required: true
        },
        task: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
        }
    },
}
</script>

<template>
<div class="task-item">
    <input type="checkbox">
    <div class="task-title">{{task.title}}</div>
    <button class="delete-item-btn" @click="$emit('tryToDelete', task)"> [x] </button>
</div>
</template>

<style>

.task-item {
    width: 200px;
    background: var(--light_green_color);
    border-radius: 10px;
    margin: 15px;
    padding: 20px 10px 10px 10px;
    display: flex;

    page-break-inside: avoid
}
.task-title {
    margin-left: 20px;
}

input[type=checkbox]:checked + div.task-title{
  text-decoration: line-through;
}

</style>