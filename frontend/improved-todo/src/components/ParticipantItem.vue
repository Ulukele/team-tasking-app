<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
}
</script>

<template>
<div class="participant-item"> {{user.username}} {{ (user.isOwner ? '(owner)' : '') }} </div>
</template>

<style>

.participant-item {
    color: var(--black_color);
    font-size: 20px;
}
</style>