<template>
    <div>
        <div class="title">
            <div></div>
            <h2>Manage Questionnaire</h2>
            <div class="button-pane"><button class="action-button" @click="newQuestion()">New Question</button></div>
            
        </div>
        <div>
            <QuestionListItem v-for="(question, i) in questions" :questionId="question.question_id" :key="i" :order="question.order" :query="question.query" />
        </div>
    </div>
</template>

<script>
import QuestionListItem from '@/components/QuestionListItem.vue';

export default {
    name: 'QuestionManagementView',
    components: {
        QuestionListItem
    },
    methods: {
        newQuestion() {

        },
        async getQuestions() {
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions");
            const res = await req.json();
            
            this.$store.state.questions = res.data;
            
            console.log(res.data);
        }
    },
    mounted() {
        this.getQuestions();
    },
    computed: {
        questions() {
            return this.$store.state.questions;
        }
    }
}
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
}

</style>