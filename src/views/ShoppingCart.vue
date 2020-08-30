<template>
	<div class="shopping-cart">
		<Header/>

		<!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more text-left">
                        <a href="./home.html"><i class="fa fa-home"></i> Home</a>
                        <span>Shopping Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, n) in keranjang" :key="item.id">
                                            <td class="cart-pic first-row">
                                                <img :src="item.photo" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{ item.nama }}</h5>
                                            </td>
                                            <td class="p-price first-row">{{ item.harga }}</td>
                                            <td @click="hapusItem(n, item.harga)" class="delete-item">
                                                <router-link to="/shopping-cart"><i class="material-icons">close</i></router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8 text-left">
                            <h4 class="mb-4">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input type="text" class="form-control" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="costumerInfo.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Masukan Email" v-model="costumerInfo.email">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input type="text" class="form-control" id="noHP" aria-describedby="noHPHelp" placeholder="Masukan No. HP" v-model="costumerInfo.number">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea class="form-control" id="alamatLengkap" rows="3" v-model="costumerInfo.address"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout">
                                <ul>
                                    <li class="subtotal text-left">ID Transaction <span>#SH12000</span></li>
                                    <li class="subtotal mt-3 text-left">Subtotal <span>{{ totalHarga }}</span></li>
                                    <li class="subtotal mt-3 text-left">Pajak <span>10% ({{ pajak }})</span></li>
                                    <li class="subtotal mt-3 text-left">Total Biaya <span>{{ totalBiaya }}</span></li>
                                    <li class="subtotal mt-3 text-left">Bank Transfer <span>Mandiri</span></li>
                                    <li class="subtotal mt-3 text-left">No. Rekening <span>2208 1996 1403</span></li>
                                    <li class="subtotal mt-3 text-left">Nama Penerima <span>Shayna</span></li>
                                </ul>
                                <a href="#" @click="checkout()" class="proceed-btn">I ALREADY PAID</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {

  name: 'ShoppingCart',
  components:{
	Header
  },
  data () {
    return {
        keranjang: [],
        totalHarga: 0,
        totalBiaya: 0,
        pajak: 0,
        costumerInfo: {
            "name": '',
            "email": '',
            "number": '',
            "address": ''
        }
    }
  },
  methods:{
    hapusItem(x, price){
        this.keranjang.splice(x, 1);
        this.totalHarga = this.totalHarga - price;
        const parsed = JSON.stringify(this.keranjang);
        localStorage.setItem('keranjang', parsed);
    },
    checkout(){
        let productId = this.keranjang.map(function(product){
            return product.id;
        });


        let checkoutData = {
            'name': this.costumerInfo.name,
            'email': this.costumerInfo.email,
            'number': this.costumerInfo.number,
            'address': this.costumerInfo.address,
            'transaction_total': this.totalBiaya,
            'transaction_status': 'PENDING',
            'transaction_details': productId
        }

        axios
        .post("http://localhost:8000/api/checkout", checkoutData)
        .then(() => this.$router.push('success'))
        .catch(err => console.log(err));


    }
  },
  mounted(){
    if (localStorage.getItem('keranjang')) {
      try {
        this.keranjang = JSON.parse(localStorage.getItem('keranjang'));
        for (var i = this.keranjang.length - 1; i >= 0; i--) {
            this.totalHarga = this.totalHarga + this.keranjang[i].harga;
        }
      } catch(e) {
        localStorage.removeItem('keranjang');
      }
    }

    this.pajak = this.totalHarga * 0.1;
    this.totalBiaya = this.totalHarga + this.pajak;

  }
}
</script>

<style lang="css" scoped>
</style>