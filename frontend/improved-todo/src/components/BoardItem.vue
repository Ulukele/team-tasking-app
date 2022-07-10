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
<button class="board-name-btn" @click="$emit('choosen', board)">{{board.name_}}</button>
</template>

<style>

.board-name-btn {
    color: var(--black_color);
    border: 0;
    background: none;
}

</style>