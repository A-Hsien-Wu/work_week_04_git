import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import { double_btn } from './components.js';
import modal from './modal.js';
import pagination from './pagination.js';

const vueApp = {
    data() {
        return {
            url                 : 'https://vue3-course-api.hexschool.io/v2',    // 請加入站點
            path                : 'a-hsien', // 請加入個人 API Path
            token               : '',
            tokenName           : 'hexApiToken',
            products            : [],
            pagination          : {},
            currentItem         : {},
            timer               : null,
            isModelShow         : false,
            modelMode           : 'addNew',
            domModel            : {},
            domModelContent     : {},
            tweenMaxDefault     : { ease: "power4.inOut" , duration: 1 },
            emptyForm           : {},
            modelProduct        : {
                title           : undefined,
                category        : undefined,
                origin_price    : undefined,
                price           : undefined,
                unit            : '個',
                stock           : 0,
                description     : undefined,
                content         : undefined,
                is_enabled      : 0,
                imageUrl        : '',
                imagesUrl       : [],
            },
            checkEnabled        : { checkToActive : false },
        }
    },
    methods: {
        apiCheckLogin(){    // 進入該頁面時，先進行檢查是否登入
            axios.post( `${this.url}/api/user/check` ).then( _response => {
                this.apiGetProducts();
            }).catch( _error => {
                location.href = '../index.html';
            });
        },
        apiGetProducts( page = 1 ){  // 取得所有產品列（更新產品列表）
            axios.get( `${this.url}/api/${ this.path }/admin/products?page=${page}` ).then( response => {
                // console.log('取出產品列表:' , response.data);
                this.products = [ ...response.data.products ];
                this.pagination = { ...response.data.pagination }
            }).catch( error => {
                // console.log( '取出產品列表 error:' , error?.response );
            });
        },
        getItem(item) { // 取得單一產品資訊
            this.currentItem = Object.assign({}, {
                ...item,
                // slider: [item.imageUrl, ...item.imagesUrl],
                slider: [item.imageUrl],
            });
            item.imagesUrl ? this.currentItem.slider.push(...item.imagesUrl) : null;    
                // prevent from there is no KEY 'imagesUrl' in item Object ⇡ 
            this.runSlider(this.currentItem.slider);
        },
        runSlider(imgArr) {     // 輪播
            clearInterval(this.timer);
            let counter = 0;
            const length = imgArr.length;
            this.timer = setInterval(() => {
                counter++;
                this.currentItem.imageUrl = this.currentItem.slider[counter % length];
            }, 2000);
        },
        apiDeleteItem(item){   // 刪除
            // console.log('delete:' , item.id);
            axios.delete( `${this.url}/api/${ this.path }/admin/product/${item.id}` ).then( response => {
                // console.log('delete:' , response.data);
                this.apiGetProducts();
            }).catch( error => {
                // console.log( 'delete:' , error?.response );
            });
        },
        getEditProduct( item ){     // 修改個別產品細項（modal） 
            // this.modelMode = 'edit'; 
            this.modelProduct = JSON.parse( JSON.stringify( item ) );
            this.isModelShow = true;

            this.checkEnabled.checkToActive = !(this.modelProduct.is_enabled == 0); // 把 false 轉成 0
        },
        removeModelData(){  // 離開 model，將所有欄位清空，回復初始狀態
            // this.modelProduct = { ...this.emptyForm }; 
            this.modelProduct = JSON.parse( JSON.stringify( this.emptyForm ) );
            this.checkEnabled.checkToActive = false;
        },
    },
    watch:{
        isModelShow( value ){
            gsap.to( this.domModel , { ...this.tweenMaxDefault , autoAlpha: (value ? 1 : 0) } );
            gsap.to( this.domModelContent , Object.assign( {} , this.tweenMaxDefault , { scale: (value ? 1 : 0) } ) );
            if( !value ) this.removeModelData();
        },
    },
    components: { double_btn , modal , pagination },
    created(){ 
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexApiToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = this.token;

        this.emptyForm = JSON.parse( JSON.stringify( this.modelProduct ) );  
        this.apiCheckLogin();
    },
    mounted() {
        this.domModel = document.querySelector('#lightbox');
        this.domModelContent = document.querySelector('#lightbox-content');
        // this.isModelShow = true;    // 一開始就跳 Model
    },
};

createApp( vueApp ).mount( '#app' );