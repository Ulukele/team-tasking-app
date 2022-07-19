<script>
export default {
    props: {
        board: {
            type: Object,
            required: true
        }
    },
    
    data() {
        return {
        }
    }
}
</script>

<template>
<div>
    <button class="item-name-btn" @click="$emit('choosen', board)">{{board.name}}</button>
    <button class="delete-item-btn" @click="$emit('tryToDelete', board)"> [x] </button>
</div>
</template>

<style>
</style>