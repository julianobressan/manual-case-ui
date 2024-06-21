<template>
    <div>
        <h2>Edit question</h2>
        <div class="first-line">
            <div id="number">#{{ order }}</div>
            <input name="query" id="query" :value="query" autocomplete="off" @input="event => query = event.target.value">
            <button class="action-button" @click="saveQuestion()">Save</button>
        </div>
        <div class="title">
            <div></div>
            <h3>Answers</h3>
            <div class="button-pane"><button class="action-button" @click="addAnswer()">New Answer</button></div>
        </div>
        
        <div v-for="(answer, i) in answers" :key="i" class="answer">

            <div class="answer-first-line">
                <div class="letter">
                    {{ String.fromCharCode((answer.order - 1) + 'A'.charCodeAt(0)) }}
                </div>
                
                <input type="text" name="" class="input-query" :id="answer.answer_id + i" :value="answer.statement" autocomplete="off" @input="event => answer.statement = event.target.value">
            </div>
            
            <div class="answer-sub-lines">
                <div>Next question:</div>
                <div class="">
                    <select @change="onChange(i, $event)">
                        <option :selected="question.question_id == answer.next_question_id" v-bind:value="question.question_id" v-for="(question, i) in questions" :key="i">#{{ question.order }} - {{ question.query }}</option>
                        <option :selected="answer.next_question_id == null">End of questionnaire</option>
                    </select>
                </div>
                
                <button class="action-button" @click="deleteAnswer(i)">Delete</button>
                <button class="action-button" @click="saveAnswer(i)">Save</button>
            </div>
            <div class="answer-sub-lines">
                <div>
                    Products to include:
                </div>
                <div class="products-pane">
                    <div v-for="(product, i) in answer.products_to_include" class="product include" :key="i">
                        {{  product.name }}
                        <button>X</button>
                    </div>
                    <div class="autocomplete-box">
                        <input type="text" name="" id="" autocomplete="off" class="search-product" @input="searchProductInclude(i, $event)">
                        <div class="autocomplete">
                            <button v-for="(product, i) in answer.products_to_include.suggestions" :key="i" class="autocomplete-button" @click="addProductInclude(i, answer, product)">{{ product.name}}</button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="answer-sub-lines">
                <div>Products to exclude:</div>
                <div class="products-pane">
                    <div v-for="(product, i) in answer.products_to_exclude" class="product exclude" :key="i">
                        {{ product.name }}
                        <button>X</button>
                    </div>
                    <div class="autocomplete-box">
                        <input type="text" name="" id="" autocomplete="off" class="search-product" @input="searchProductExclude(i, $event)">
                        <div class="autocomplete">
                            <button v-for="(product, i) in answer.products_to_exclude.suggestions" :key="i" class="autocomplete-button" @click="addProductExclude(i, answer, product)">{{ product.name}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateEditQuestionView',
    data() {
        return {
            order: null,
            query: null,
            questionId: this.$route.params.id,
            answers: [],
            allProducts: []
        }
    },
    methods: {
        onChange(index, event) {
            this.answers[index].next_question_id = event.target.value;
        },
        async getQuestionInfo() {
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id);
            const res = await req.json();
            this.order = res.data.order;
            this.query = res.data.query;
            this.answers = res.data.answers;
            console.log(this.answers)
        },
        async getAllProducts() {
            const req = await fetch(process.env.VUE_APP_API_URL + "/products/");
            const res = await req.json();
            
            console.log(res.data);
            this.allProducts = res.data;
        },
        async saveQuestion() {
            const body = JSON.stringify({
                payload: {
                    query: this.query,
                    order: this.order
                }
            });
            
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json"},
                body: body
            });
            this.showAlert(req, 'Question updated.');
        },
        async saveAnswer(index) {
            const body = JSON.stringify({
                payload: {
                    statement: this.answers[index].statement,
                    order: this.answers[index].order,
                    next_question_id: this.answers[index].next_question_id,
                }
            });
            console.log(body, this.answers[index])
            let req = null;
            if (this.answers[index].answer_id) {
                req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id + "/answers/" + this.answers[index].answer_id, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json"},
                    body: body
                });
                this.showAlert(req, 'Answer updated.');
            } else {
                req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id + "/answers/", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: body
                });
                const res = await req.json();
                if (res.status == 201) {
                    this.answers[index].id = res.data.answer_id;
                }
                
                this.showAlert(req, 'Answer updated.');
            }
        },
        addAnswer() {
            this.answers.push({
                order: this.answers.at(-1).order + 1,
                statement: '',
                next_question_id: null,
                id: null
            });
        },
        showAlert(req, message) {
            let icon = 'success';
            let text = '';
            if (req.status > 299) {
                icon = 'error';
                message = 'Error';
                text = 'Some error occurred. No details implemented yet.';
            }
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                target: document.getElementById('content')
            });
            Toast.fire({
                icon: icon,
                title: message,
                text: text
            })
        },
        async deleteAnswer(index) {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id + "/answers/" + this.answers[index].answer_id, {
                        method: 'DELETE'
                    });
                    console.log(req, this.answers)
                    if (req.status == 204) {
                        this.answers.splice(index, 1);
                    }
                    console.log(this.answers)
                    this.showAlert(req, 'Answer deleted.');
                }
            });
        },
        async getQuestions() {
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions");
            const res = await req.json();
            
            this.$store.state.questions = res.data;
            
            console.log(res.data);
        },
        searchProductExclude(index, event) {
            if (event.target.value) {
                const product_ids = this.answers[index].products_to_exclude.map(item => item.id);
                const results = this.allProducts.filter(function (element) {
                    return !product_ids.includes(element.product_id) && element.name.toLowerCase().startsWith(event.target.value.toLowerCase())
                });
                this.answers[index].products_to_exclude.suggestions = results;
            } else {
                this.answers[index].products_to_exclude.suggestions = [];
            }
        },
        searchProductInclude(index, event) {
            if (event.target.value) {
                const product_ids = this.answers[index].products_to_include.map(item => item.id);
                const results = this.allProducts.filter(function (element) {
                    return !product_ids.includes(element.product_id) && element.name.toLowerCase().startsWith(event.target.value.toLowerCase())
                });
                this.answers[index].products_to_include.suggestions = results;
            } else {
                this.answers[index].products_to_include.suggestions = [];
            }
        },
        async addProductInclude(i, answer, product) {
            const body = JSON.stringify({
                payload: {
                    product_id: product.product_id
                }
            });
            
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id + "/answers/" + answer.answer_id + "/include", {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: body
            });
            const res = await req.json();
            this.answers[i].products_to_include = res.data.products_to_include;
        },
        async addProductExclude(i, answer, product) {
            const body = JSON.stringify({
                payload: {
                    product_id: product.product_id
                }
            });
            
            const req = await fetch(process.env.VUE_APP_API_URL + "/questions/" + this.$route.params.id + "/answers/" + answer.answer_id + "/exclude", {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: body
            });
            const res = await req.json();
            this.answers[i].products_to_exclude = res.data.products_to_exclude;
        }
    },
    mounted() {
        this.getQuestionInfo();
        this.getQuestions();
        this.getAllProducts();
    },
    computed: {
        questions() {
            return this.$store.state.questions;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/style/variables.scss";

input, textarea, select {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #CCC;
    font-weight: 500;
    font-size: 1rem;
    font-family: $fontFamily;
}

textarea:focus, input:focus{
    outline: none;
}

.answer-sub-lines {
    padding: 1rem 0 0 30px;
}

#number {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}
button, select {
    margin-left: 10px;
}

#query, select {
    flex-grow: 1;
}

select {
    max-width: calc(100% - 10px);
    margin-right: 10px;
}

.first-line {
    display: flex;
    flex-direction: row;
    margin-bottom: 3rem;
}

.input-query {
    flex-grow: 1;
}

.answer {
    margin-bottom: 20px;
    padding: 2rem;
    background-color: rgb(248, 247, 246);
    border-radius: 20px;
}
.letter {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}
.answer-first-line {
    display: flex;

}
.answer-sub-lines {
    display: flex;
    > div {
        display: flex;
        align-items: center;
        min-width: 120px;
    }
}
.products-pane {
    background-color: #FFF;
    flex-grow: 1;
    border-radius: 10px;
    height: 3rem;
    margin-left: 1rem;
}
.product {
    border-radius: 10px;
    height: 2rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: .5rem;
    font-weight: 500;
    font-size: .9rem;

    button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        transition: .2s;
        border-radius: 6px;
        &:hover {
            background-color: #ffffff;
        }
        width: 26px;
        padding: 5px;
    }
}

.autocomplete-box {
    position: relative;
    display: inline-block;
}
.search-product {
    border: 0;
    flex-grow: 1;
    padding: 10px;
    font-weight: 400;
}
.autocomplete {
    position: absolute;
    background-color:  #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    border-radius: 5px;
    left: 10px;
    right: 0;
    display: flex;
    flex-direction: column;
    button {
        flex-grow: 1;
        cursor: pointer;
        border: 0;
        margin: 0;
        background-color: transparent;
        transition: .2s;
        padding: 10px;
        &:hover {
            background-color: #e7e5e5;
        }
        &:first-child {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        &:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
}
.include {
    background-color: #eeffe6;
}
.exclude {
    background-color: #ffe6e6;
}
</style>