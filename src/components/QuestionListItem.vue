<template>
    <div class="item-line">
        <RouterLink :to="'/management/'+ questionId">{{ order }}. {{ query }}</RouterLink>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'QuestionListItem',
    components: {
        RouterLink
    },
    props: {
        order: Number,
        query: String,
        questionId: Number
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.item-line {
    font-weight: 500;
    border-bottom: 1px solid #DDD;
    padding: 1rem 0;
    &:last-child {
        border-bottom: 0;
    }
}
a {
    text-decoration: none;
    color: $color1;

    &:hover {
        text-decoration: underline;
    }
}
</style>