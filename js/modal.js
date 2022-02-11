const close_btn = {
    template : `
    <img src="./images/close_white_24dp.svg" alt="" 
        class="cursor-pointer inline-block p-8 -mr-6 transition-all duration-500 
            ease-in-out origin-center hover:rotate-180 ml-auto" 
        @click.self="$emit('emit_event');">`,
}

const model_header = {
    template: `
    <header class="model__content__header">
        <h5>{{ mode === 'addNew' ? 'Add New Product' : 'Edit Product Mode' }}</h5>
        <button class="bg-pink-500 hover:bg-pink-600 focus:ring-pink-400
            focus:ring-4 py-1 px-4" @click="$emit('emit_event_sample');" v-show="mode==='addNew'">
            Sample
        </button>
        <close_btn @emit_event="$emit('emit_event_close');"></close_btn>
    </header>`,
    props: [ 'product' , 'mode' ],
    components: { close_btn },
}

const input_title = {
    template : `
    <label for="titleInput" class="col-span-6 relative text-base">
        <span class="text-blue-500">Title</span>
        <input type="text" id="titleInput" placeholder="new item title"
            class="input-style-structure input-style--color" v-model="product.title" required>
    </label>`,
    props : [ 'product' ],
}

const input_category = {
    template : `
    <label for="categoryInput" class="col-span-6 md:col-span-2 relative text-base">
        <span class="text-blue-500">Category</span>
        <input type="text" id="categoryInput" placeholder="category"
            class="input-style-structure input-style--color" v-model="product.category" required>
    </label>`,
    props : [ 'product' ],
}

const input_unit = {
    template : `
    <label for="unitInput" class="col-span-6 md:col-span-2 relative text-base">
        <span class="text-blue-500">Unit</span>
        <select class="input-style-structure input-style--color" aria-label="Default select example" 
            v-model="product.unit">
            <option v-for="item in unit" :value="item" :key="item">{{ item }}</option>
        </select>
    </label>`,
    props : [ 'product' , 'unit' ],
}

const input_stock = {
    template : `
    <label for="stockInput" class="col-span-6 md:col-span-2 relative text-base">
        <span :class="{ 'text-green-500' : product.stock > 0 , 'text-red-500':product.stock == 0, }">Stock</span>
        <input type="number" id="stockInput" placeholder="0"
            class="input-style-structure input-style--color" min="0" 
            v-model.number="product.stock" required>
    </label>`,
    props : [ 'product' ],
}

const input_price = {
    template : `
    <label for="priceInput" class="col-span-6 md:col-span-3 relative text-base">
        <span class="text-blue-500">Price</span>
        <input type="number" id="priceInput" placeholder="price"
            class="input-style-structure input-style--color" min="0" 
            v-model.number="product.origin_price" required>
    </label>`,
    props : [ 'product' ],
}

const input_discount = {
    template : `
    <label for="discountInput" class="col-span-6 md:col-span-3 relative text-base">
        <div class="flex">
            <span class="text-blue-500">Discount</span>
            <span v-show="discount" 
                :class="{ 'text-red-500':discount>0, 'text-green-500':discount<0 }">
                （{{ discount < 0 ? discount+'%' : '+'+discount+'%' }}）
            </span>
        </div>
        <input type="number" id="discountInput" placeholder="discount"
            class="input-style-structure input-style--color" min="0" v-model.number="product.price" required>
    </label>`,
    props : [ 'product' , 'discount' ],
}

const input_describe = {
    template : `
    <label for="describeInput" class="col-span-6 relative text-base">
        <span class="text-blue-500">Description</span>
        <textarea id="describeInput" rows="2" cols="50"
            placeholder="Describe this product here..."
            class="input-style-structure input-style--color" v-model="product.description"></textarea>
    </label>`,
    props : [ 'product' ],
}

const input_content = {
    template : `
    <label for="contentInput" class="col-span-6 relative text-base">
        <span class="text-blue-500">Content</span>
        <textarea rows="2" cols="50" id="contentInput" 
            placeholder="請輸入說明內容..."
            class="input-style-structure input-style--color" v-model="product.content">
        </textarea>
    </label>`,
    props : [ 'product' ],
}

const input_enabled = {
    template : `
    <label for="enabled-switcher" 
        class="col-span-2 mb-4 switcher-label">
        <input type="checkbox" id="enabled-switcher" class="sr-only" v-model="check.checkToActive">
        <div class="switcher-bg switcher-bg--off"></div>
        <span class="switcher-text ml-3 text-sm font-medium flex-none">check to active</span>
    </label>`,
    // watch:{
    //     'check.checkToActive': function( value ){
    //         console.log('is_enabled' , value );
    //     },
    // },
    props : [ 'check' ],
}
const main_photo = {
    template : `
    <label for="mainImgInput" class="col-span-2 relative text-base select-none">
        <span class="text-blue-500">Main Photo</span>
        <input type="text" id="mainImgInput" placeholder="please paste image link here"
            class="input-style-structure input-style--color" v-model="product.imageUrl" >
    </label>
    <div class="col-span-2 text-blue-300">
        <div class="rounded-lg bg-no-photo outline-4 outline-gray-300"
            :class="[isMainPhotoSuccess ? '': 'outline-dashed']">
            <div class="w-full aspect-video rounded-lg flex fx-center">
                <span class="text-yellow-500 text-xl px-4 text-center font-bold" 
                    v-show="!isMainPhotoSuccess">
                    Paste Image URL In The Text Field Above</span>
                <img :src="product.imageUrl" 
                    class="w-full aspect-video rounded-lg object-cover" 
                    @load="loadPhotoSuccess" @error="loadPhotoError" v-show="isMainPhotoSuccess">
            </div>
        </div>
    </div>`,
    props : [ 'product' ],
    data() {
        return {
            isMainPhotoSuccess  : false,
        }
    },
    methods: {
        loadPhotoSuccess(event){    // 主圖成功
            this.isMainPhotoSuccess = true;
        },
        loadPhotoError(event){  // 主圖失敗
            this.isMainPhotoSuccess = false;
        },
    },
}

const upload_photo = {
    template : `
    <div class="col-span-2" v-if="mode==='addNew'">
        <!-- 新增上傳 -->
        <div class="">
            <div class="flex gap-2">
                <span class="text-blue-500">Other Images</span>
                <span :class="{
                    'text-red-500':info.status=='fail',
                    'text-green-500':info.status=='success'}" 
                    v-show="info.status=='success'||'fail'">
                    {{ info.msg }}
                </span>
                <img src="./images/refresh_black_24dp.svg" 
                    class="animate-spin opacity-30 text-blue-600" v-show="info.status=='uploading'">
            </div>
            <div class="upload-box">
                <div class="hw-full border-4 border-gray-300 border-dashed">
                    <div class="hw-full bg-contain-center
                        opacity-30 relative hover:bg-green-300"
                        style="background-image: url(./images/cloud_upload_black_48dp.svg);">
                
                        <input type="file" id="file" placeholder="drag a file here"         
                            name="file-to-upload"       
                            @change="apiUploadFile"
                            class="absolute hw-full outline-none cursor-pointer opacity-0">
                    </div>
                </div>
            </div>
        </div>
        <!-- 已上傳圖 -->
        <div class="">
            <div class="md:flex flex-wrap">
                <template v-for="(item,i) in product.imagesUrl" :key="item+i">
                    <div class="rounded-lg p-2 flex-auto max-w-full min-w-[50%] cursor-pointer" 
                        v-if="product.imagesUrl.length > 0" @click="removeUpload(i)">
                        <div class="relative">
                            <img :src="item" class="h-24 w-full object-cover rounded-lg" >
                            <div class="rounded-lg absolute hw-full inset-0 bg-contain-center
                                hover:bg-black hover:opacity-50 opacity-0"
                                style="background-image: url(./images/delete_white_24dp.svg);"></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="col-span-2" v-else>
        <span class="text-blue-500">Add More Image</span>
        <div class="flex mt-1">
            <label for="editAddMore" class="col-span-2 relative text-base select-none w-full">
                <input type="text" id="editAddMore" placeholder="please paste image link here"
                    class="input-style mt-0 rounded-none rounded-l-md focus:ring-0 
                    focus:border-slate-300" v-model="editAddImg">
            </label>
            <button type="button" class="px-6 py-3 bg-white border shadow-sm 
            border-slate-300 border-l-0 focus:bg-zinc-100 rounded-r-md sm:text-sm 
            hover:bg-sky-100 drop-shadow-sm"
            @click="editImgToArr">+</button>
        </div>
        <template v-for="(item,i) in product.imagesUrl" :key="item+i">
            <div class="w-full border-t-2 border-slate-200 md:my-6"></div>
            <label :for="'multiImg'+i" class="col-span-2 relative text-base select-none">
                <input type="text" :id="'multiImg'+i" 
                placeholder="please paste image link here"
                class="input-style-structure input-style--color" 
                v-model="product.imagesUrl[i]" >
            </label>
            <div class="rounded-lg my-4 flex-auto max-w-full min-w-[50%] cursor-pointer" 
                v-show="product.imagesUrl[i]" @click="removeUpload(i)">
                <div class="relative">
                    <img :src="item" class="h-24 w-full object-cover rounded-lg" >
                    <div class="rounded-lg absolute hw-full inset-0 bg-contain-center 
                        hover:bg-black hover:opacity-50 opacity-0"
                        style="background-image: url(./images/delete_white_24dp.svg);">
                    </div>
                </div>
            </div>
        </template>
    </div>`,
    props : [ 'product' , 'mode' , 'info' ],
    data() {
        return {
            url                 : 'https://vue3-course-api.hexschool.io/v2',    // 請加入站點
            path                : 'a-hsien', // 請加入個人 API Path
            editAddImg          : '',
        }
    },
    // watch:{
    //     'info.status': function( value ){
    //         // console.log('status' , value );
    //     },
    //     'info.msg': function( value ){
    //         // console.log('msg' , value );
    //     },
    // },
    methods: {
        apiUploadFile(e){  // 上傳圖片
            this.info.status = 'uploading';
            this.info.msg = 'Uploading!';
            // console.log('file:' , e.target.files[0]);
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append( 'file-to-upload' , file );
            axios.post( `${this.url}/api/${this.path}/admin/upload` , formData )
                .then( response => {
                    // console.log( 'upload success:' , response );
                    this.info.status = 'success';
                    this.info.msg = 'Success!';
                    this.product.imagesUrl.push( response.data.imageUrl );
                })
                .catch( error => {
                    // console.log( 'upload fail:' , error.response );
                    this.info.status = 'fail';
                    this.info.msg = `（狀態：${error.response.data.message}）`;
                });
        },
        uploadFakeFile(e){  // 上傳圖片：測試用的
            this.info.status = 'uploading';
            this.info.msg = 'Uploading!';
            // console.log('file:' , e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener( 'load' , () =>{
                this.product.imagesUrl.push( reader.result );
            });
        },
        removeUpload( index ){  // 上傳圖片：移除
            this.product.imagesUrl.splice( index , 1 );
            // 無法遠端刪除，僅移除陣列內的圖片網址
        },
        editImgToArr(){ // Edit Mode - 新增更多圖片，未驗證是否為正確圖片格式
            if( !this.product.imagesUrl ){
                this.product.imagesUrl = [];
            };
            this.product.imagesUrl.push(this.editAddImg);
            this.editAddImg = '';
        },
    },
}

const modal = {
    data() {
        return {
            url                 : 'https://vue3-course-api.hexschool.io/v2',    // 請加入站點
            path                : 'a-hsien', // 請加入個人 API Path
            saveStatus          : 'Save',
            unitArr             : ['個', '件', '支', '張', '隻', '塊', '本', '顆', '台', '片', '把', '份'],
            uploadInfo          : { status:'' , msg:'' },
            checkEnabled        : { checkToActive : false },
        }
    },
    methods: {
        apiAddNewProduct(){    // 新增產品上傳
            // this.product.is_enabled = this.check.checkToActive ? 1 : 0;
            this.product.is_enabled = this.checkEnabled.checkToActive ? 1 : 0;
            const newProduct = { data : { ...this.product } };
            this.saveStatus = 'saving';
            axios.post( `${this.url}/api/${ this.path }/admin/product` , newProduct ).then( response => {
                // console.log('新增產品 success:' , response.data);
                this.saveStatus = 'success';
                this.$emit('emit_event_refresh_products');  // 新增後，直接跳到第一頁
                this.$emit('emit_event_empty_inputs');
                // this.checkToActive = false;
            }).catch( error => {
                // console.log('新增產品 error:' , error?.response );
            });
        },
        apiEditProduct(){   // 修改產品內容
            // this.product.is_enabled = this.check.checkToActive ? 1 : 0;
            this.product.is_enabled = this.checkEnabled.checkToActive ? 1 : 0;
            const newProduct = { data : { ...this.product } };
            this.saveStatus = 'saving';
            axios['put']( `${this.url}/api/${ this.path }/admin/product/${this.product.id}` , newProduct )
            .then( response => {
                // console.log('修改 success:' , response.data);
                this.saveStatus = 'success';
                this.$emit('emit_event_refresh_products' , this.current_page);  // 修改完，仍維持在原本頁數
            }).catch( error => {
                // console.log('修改 error:' , error?.response );
            });
        },
        setSample(){    // model 新增時，懶得填資料可以用的樣板
            this.product.title          = '肋眼牛排';
            this.product.category       = '食物';
            this.product.origin_price   = 1080;
            this.product.price          = 980;
            this.product.unit           = '份';
            this.product.stock          = 0;
            this.product.description    = 'Why go to a steakhouse when you can make the most perfect ribEye right at home? Pan seared with the best garlicky herb butter!';
            this.product.content        = 'U.S. Prime or Choice';
            this.product.is_enabled     = 0;
            this.product.imageUrl       = 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=627&q=80';
            this.product.imagesUrl      = [
                'https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1626790291085-19a27173773c?auto=format&fit=crop&w=687&q=80',
                'https://images.unsplash.com/photo-1611518040286-9af8ba97ab46?auto=format&fit=crop&w=687&q=80',
                'https://images.unsplash.com/photo-1612078894671-f11ba41d713e?auto=format&fit=crop&w=687&q=80'];
        },
        removeModelData(){  // 離開 modal，將所有欄位清空，回復初始狀態
            this.saveStatus = 'Save';
            this.uploadInfo.status = ''; 
            this.uploadInfo.msg = '';
        },
    },
    computed:{
        priceDiscount(){
            if( this.product.origin_price && this.product.price ){
                return Math.round( -(100 - (this.product.price / this.product.origin_price) * 100) ) ;
            }else{
                return undefined;
            }
        },
    },
    template: `
    <div id="lightbox" class="model-bottom-layer">
        <div class="container-center flex md:m-auto"> 
            <div id="lightbox-content" class="model__content">

            <!-- header -->
                <model_header 
                    @emit_event_close="$emit('emit_event_close',false);" @emit_event_sample="setSample" 
                    :product="product" :mode="mode">
                </model_header>

            <!-- content -->
                <div class="px-6 py-12">
                    <form action="" autocomplete="off" class="text-gray-500 w-full" 
                        @submit.prevent="mode === 'addNew' ? apiAddNewProduct() : apiEditProduct()">
                        <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">

                        <!-- 1/2 -->
                            <div class="grid grid-cols-6 gap-y-8 gap-x-8 auto-rows-min">

                            <!-- 標題 -->
                                <input_title :product="product"></input_title>
                            <!-- 分類 -->
                                <input_category :product="product"></input_category>
                            <!-- 存貨 -->
                                <input_stock :product="product"></input_stock>
                            <!-- 單位 -->
                                <input_unit :product="product" :unit="unitArr"></input_unit>
                            <!-- 原價 -->
                                <input_price :product="product"></input_price>
                            <!-- 特價 -->
                                <input_discount :product="product" :discount="priceDiscount"></input_discount>

                                <div class="hidden md:block col-span-6 w-full border-b-2 border-slate-200"></div>

                            <!-- 產品描述 -->
                                <input_describe :product="product"></input_describe>
                            <!-- 說明內容 -->
                                <input_content :product="product"></input_content>
                            <!-- 是否啟用 -->
                                <input_enabled :check="checkEnabled"></input_enabled>

                            </div>

                        <!-- 1/2 -->
                            <div class="grid grid-cols-2 gap-y-8 gap-x-8 auto-rows-min">

                            <!-- 主圖 -->
                                <main_photo :product="product"></main_photo>
                            <!-- 新增次圖 -->
                                <upload_photo :product="product" :mode="mode" :info="uploadInfo"></upload_photo>
                            </div>

                        </div>

                        <div class="w-full border-t-2 border-slate-200 my-4 py-8">
                            <div class="flex gap-4 justify-end items-baseline">
                                <div class="flex gap-1 items-center" v-show="saveStatus=='success'">
                                    <span class="text-green-500">建立成功</span>
                                </div>
                                <button 
                                    type="button" class="btn-rounded-full bg-gray-600 ring-gray-300" 
                                    @click.self="$emit('emit_event_close',false); removeModelData();">
                                    Close
                                </button>
                                <button 
                                    type="submit" class="btn-rounded-full bg-blue-600 ring-blue-300"
                                    :class="{
                                        'bg-green-500':saveStatus=='success','ring-green-300':saveStatus=='success',
                                        'bg-yellow-500':saveStatus=='saving','ring-yellow-300':saveStatus=='saving'}">
                                    {{ saveStatus }}
                                </button>
                            </div>
                        </div>
                        
                    </form>
                </div>

            </div>
        </div>
    </div>`,
    props: [ 'product' , 'mode' , 'empty' , 'current_page' ],
    components: { 
        model_header , 
        input_title , 
        input_category , 
        input_stock , 
        input_unit , 
        input_price , 
        input_discount , 
        input_describe , 
        input_content , 
        input_enabled , 
        main_photo , 
        upload_photo
    },
    created() {
        this.$emit('emit_event_enabled' , this.checkEnabled );  
        // 把 checkEnabled 發出去，讓外層控制 checkEnabled
    },
};



export default modal;