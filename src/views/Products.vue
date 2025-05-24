<script>
import NavBar from '../components/NavBar.vue'
import ProductsPlace from '../components/ProductsPlace.vue'
import Footer from '../components/Footer.vue'

export default{
  components:{
    NavBar,
    ProductsPlace,
    Footer,
  },
  mounted(){
    this.$router.push({ path: '/products', query: { id: localStorage.getItem('id') }})
  },
}
</script>

<template>
  <NavBar />
  <div class="more">
    <ProductsPlace />
  </div>
  <Footer />
</template>

<style scoped>
.more{
  margin-top:150px;
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

.start{
  position:relative;
  color:#00E84D;
  padding:0 20px;
  margin-bottom:100px;
}

.start::before{
  content:'';
  position:absolute;
  right:0;
  bottom:8%;
  background-color:#00E84D;
  padding:25px 3px;
}

.button{
    background-color:orangered;
    color:white;
    padding:10px 30px;
    border-radius:4px;
    cursor:pointer;
}
</style>
