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
    {{task.title}}
</div>
</template>

<style>

.task-item {
    width: fit-content;
    background: var(--light_green_color);
    border-radius: 10px;
    margin: 15px;
    padding: 20px 10px 10px 10px;
}

</style>