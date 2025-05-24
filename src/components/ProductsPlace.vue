<script>
export default {
    data() {
        return {
            products:[],
            filteredproducts2: [],
            selectedCategory:'الكل',
            fp:[],
            fp1:[],
            fp2:[],
            fp3:[],
        }
    },
    methods: {
        filterProducts(categoryname){
            this.selectedCategory = categoryname;
           if(categoryname === 'الكل'){
            return this.filteredproducts2 = this.products;
           }
           let filteredProducts = this.products.filter( (product) => {
                return product.category === categoryname;
            })
            
            this.filteredproducts2 = [];
            this.filteredproducts2 = filteredProducts;
        },
        addToCart(){
            this.$router.push('/order')
        }
    },
    mounted() {
        fetch('https://bren-shop.glitch.me/api/products')
            .then(response => response.json())
            .then(data => {
                this.products = data;

                let filteredProducts = this.products.filter((product) => {
                    return product.category === 'ديسكورد';
                });

                this.fp = [];
                this.fp = filteredProducts;

                let filteredProducts1 = this.products.filter((product) => {
                    return product.category === 'سوشيال ميديا';
                });

                this.fp1 = [];
                this.fp1 = filteredProducts1;

                let filteredProducts2 = this.products.filter((product) => {
                    return product.category === 'لوقوهات';
                });

                this.fp2 = [];
                this.fp2 = filteredProducts2;

                let filteredProducts3 = this.products.filter((product) => {
                    return product.category === 'طلب خاص';
                });

                this.fp3 = [];
                this.fp3 = filteredProducts3;
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    },
};
</script>

<template>
    <div class="type">
      <h1 class="start" data-aos="fade-up">المنتجات</h1>
  <div class="cont">
      <div class="card" data-aos="fade-left" v-for="(product, index) in products" :key="index">
          <img :src="product.image" alt="Product Image">
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <div class="btn">
              <a>{{ product.price }} SAR</a>
              <a class="button" @click="addToCart"><font-awesome-icon :icon="['fas', 'cart-plus']" /></a>
          </div>
      </div>
  </div>
    </div>
  </template>
  
  <style scoped>
  
  .active{
      color:#000000;
  }
  
  .filter{
      margin-top:100px;
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:50px;
  }
  
  .filter ul{
      list-style:none;
      width:30%;
      display:flex;
      flex-direction:row-reverse;
      justify-content:center;
      align-items:center;
      
  }
  
  .type{
      margin-top:100px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      gap:40px;
  }
  
  .filter ul li{
      padding:0 10px;
      cursor:pointer;
  }
  
  .filter ul li:nth-child(2),.filter ul li:nth-child(3),.filter ul li:nth-child(4),.filter ul li:nth-child(1){
      border-left:1px solid #000000;
      color:rgb(99, 99, 99);
  }
  
  .filter ul li:nth-child(5){
      color:rgb(99, 99, 99);
  }
  
  .filter ul li:hover{
      color:#000000;
  }
  
  .icon{
      text-decoration:none;
  }
  
  .cont{
      width:100%;
      margin-top:10px;
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      flex-wrap:wrap;
      gap:50px;
  }
  
  .category{
      color:rgb(66, 66, 66);
  }
  
  .card{
      font-family:'Rubik';
      width:300px;
      min-height:400px;
      border-radius:8px;
      display:flex;
      flex-direction:column;
      justify-content:end;
      align-items:end;
      text-align:end;
      gap:5px;
      color:#000000;
      margin:30px 0;
      transition:1s;
      padding:10px 20px;
  }
  
  .start{
      color:black;
      font-size:50px;
      text-align:center;
  }
  
  .card img{
      width:250px;
      margin-bottom:20px;
  }
  
  .btn{
      margin-top:20px;
      font-size:20px;
      text-align:center;
      display:flex;
      flex-direction:row-reverse;
      justify-content:center;
      align-items:center;
      gap:50px;
  }
  
  .button{
      color:#000000;
      cursor:pointer;
      background:none;
      margin-bottom:18px;
  }
  
  .button2{
      padding:15px 15px;
      margin-top:23px;
      border:1px solid #000000;
      border-radius:4px;
      cursor:pointer;
      color:#000000;
  }
  
  .card:hover{
      box-shadow:1px 5px 5px rgba(24, 23, 23, 0.445);
      background-color:rgba(250, 250, 250, 0.329);
  }
  
  @media screen and (max-width: 768px) {
      .card{
          width:90vw;
      }
  
      .card img{
      width:250px;
      margin-bottom:20px;
  }
  
  .card h3{
      font-size:20px;
  }
  
  .card p{
      font-size:15px;
  }

  .start{
    font-size:30px;
  }
  }
  </style>
  
