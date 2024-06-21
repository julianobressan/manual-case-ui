<template>
    <div v-if="!isComplete">
        <div class="query">{{ question.query }}</div>
        <ul class="answers">
            <li v-for="(answer, index) in answers" :key="index">
                <div class="letter">
                    {{ String.fromCharCode((answer.order - 1) + 'A'.charCodeAt(0)) }}
                </div>
                <button class="answer" @click="answerQuestion(answer.answer_id)">{{ answer.statement }}</button>
            </li>
        </ul>
    </div>
    <div v-if="isComplete">
        <h3>Congratulations!</h3>
        You have finished answering the Questionnaire. The reccomended medications for you are as follows.
    </div>
    <div class="div-action"><button class="action-button" @click="restart()">Restart</button></div>
    
</template>

<script>
export default {
    name: "QuestionPane",
    methods: {
        async answerQuestion(id) {
            const req = await fetch("http://0.0.0.0/api/v1/questions/" + this.$store.state.question.id  + "/answers/" + id, {
                method: 'POST'
            });
            const res = await req.json();
            console.log(res);

            this.$store.state.products = res.data.recommended_products;
            if (res.data.complete) {
                this.$store.state.question = null;
                this.$store.state.complete = true;
            } else {
                this.$store.state.question.id = res.data.question.question_id;
                this.$store.state.question.order = res.data.question.order;
                this.$store.state.question.query = res.data.question.query;
                this.$store.state.answers = res.data.question.answers;
            }
            
        },
        async restart() {
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/restart", {
                method: 'PUT'
            });
            const res = await req.json();
            console.log(res)
            this.$store.state.question = {
                id: res.data.question.question_id,
                order: res.data.question.order,
                query: res.data.question.query,
            };
            this.$store.state.answers = res.data.question.answers;
            this.$store.state.products = [];
            this.$store.state.complete = false;
        }
    },
    computed: {
        question() {
            return this.$store.state.question;
        },
        answers() {
            return this.$store.state.answers;
        },
        isComplete() {
            return this.$store.state.complete;
        }
    }
}
</script>

<style lang="scss" scoped>
.div-action {
text-align: center;
}

h3 {
    margin-bottom: .5rem;
}
.query {
    font-weight: 600;
    font-size: 1.2rem;
}

.answers {
    padding-top: 1rem;
    padding-left: 0rem;

    li {
        list-style: none;
        display: flex;
        margin-bottom: 1rem
    }
    
}

.number {
    width: 2rem;
    display: inline-block;
}

.letter {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}

.answer {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: left;
    font-weight: 500;
    font-size: 1.2rem;
    background-color: #EEE;
    padding: 10px 20px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    text-decoration: none;
    color: #0B3B3C;
    transition: .3s;

    &:hover {
        background-color: #f1dec6;
    }
}
</style>