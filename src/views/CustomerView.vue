<template>
    <div>
        <h2>Start Now</h2>
        <QuestionPane />
        <ProductsPane />
    </div>
</template>

<script>
import QuestionPane from '@/components/QuestionPane.vue';
import ProductsPane from '@/components/ProductsPane.vue';

export default {
    name: "CustomerView",
    components: {
        QuestionPane,
        ProductsPane
    },
    methods: {
        async getQuestion() {
            console.log(process.env)
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/next");
            const res = await req.json();
            this.$store.state.complete = res.data.complete;
            if (res.data.complete) {
                this.$store.state.question = null;
                this.$store.state.products = [];
            } else {
                this.$store.state.question = {
                    order: res.data.question.order,
                    id: res.data.question.question_id,
                    query: res.data.question.query,
                    
                }
                this.$store.state.answers = res.data.question.answers;
                this.$store.state.products = res.data.recommended_products;
            }
            
            console.log(res.data);
        }
    },
    mounted() {
        this.getQuestion();
    }
}
</script>

<style lang="scss">

</style>