<template>
    <div id="products-pane">
        <h3>Recommended medications:</h3>
        <div class="products-list">
            <div v-for="(product, index) in products" :key="index">{{ product.name }}</div>

            <div v-if="isEmpty">No products available</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'ProductsPane',
    computed: {
        products() {
            return this.$store.state.products;
        },
        isEmpty() {
            return this.$store.state.products.length === 0;
        }
    }
}
</script>

<style lang="scss" scoped>
#products-pane {
    margin-top: 1rem;
}
.products-list {
    display: flex;
    justify-content: center;

    > div {
        background-color: #EEE;
        padding: 10px;
        border-radius: 5px;
        margin-right: 1rem;
        margin-top: .5rem;
        font-weight: 500;
    }
}

</style>