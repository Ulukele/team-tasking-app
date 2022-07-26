<script>
import { axios_utils } from '../axios_utils';

const percentColors = [
    { pct: 0.0, color: { r: 0x96, g: 0xe0, b: 0x72 } },
    { pct: 1.0, color: { r: 0xfb, g: 0x63, b: 0x76 } }
    ];
var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
};

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
            solved: false
        }
    },

    beforeMount() {
        this.solved = this.task.solved
    },

    computed: {
        taskColor() {
            return getColorForPercentage(this.task.importance / 100)
        }
    },

    watch: {
        solved: function(newVal, oldVal) {
            this.$emit('tryToMark', {
                id: this.task.id,
                solved: newVal
            })
        }
    }
}
</script>

<template>
<div class="item-full-container">
    <div v-if="task.workerId > 0">
        <label class="workerId-label">worker: {{task.workerId}}</label>
    </div>
    <div class="task-cont-2">
        <div class="task-item">
            <input type="checkbox" v-model="solved">
            <div class="task-title">{{task.title}}</div>
        </div>
        <div class="task-actions">
            <button class="delete-item-btn" @click="$emit('tryToDelete', task)"> [x] </button>
        </div>
    </div>
</div>
</template>

<style>
.item-full-container {
    margin: 15px;
    padding: 5px;
    border-radius: 10px;
    background: var(--black_color);
    width: fit-content;
    height: fit-content;
}
.task-cont-2 {
    display: flex;
}

.workerId-label {
    margin: 10px;
    color: white;
}

.task-actions {
    width: fit-content;
    padding: 5px;
    display: flex;
}
.task-item {
    width: 200px;
    background: v-bind(taskColor);
    border-radius: 10px;
    padding: 20px 10px 10px 10px;
    display: flex;
}
.task-title {
    margin-left: 20px;
    page-break-inside: avoid;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
}

input[type=checkbox]:checked + .task-title{
  text-decoration: line-through;
}

</style>