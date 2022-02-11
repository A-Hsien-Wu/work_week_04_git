export const toggle_icon = {
    template : `
        <div class="cursor-pointer" @click.prevent="$emit('emit_event')">
            <span 
                class="block w-4 h-4 bg-cover" 
                :style="{ 'background-image': 'url('+img_url_a+')'}" 
                v-if="!show_pwd"></span>
            <span 
                class="block w-4 h-4 bg-cover" 
                :style="{ 'background-image': 'url('+img_url_b+')'}" 
                v-else></span>
        </div>`,
    props : {
        img_url_a : {
            default : 'images/visibility_black_24dp.svg',
            type    : String,
        },
        img_url_b : {
            default : 'images/visibility_off_black_24dp.svg',
            type    : String,
        },
        show_pwd  : {},
    },
};

export const double_btn = {
    template : `
    <div class="p-4 flex justify-center">
        <button type="button" class="flex-none hover:bg-yellow-500 border-2 border-yellow-500
            focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50
            text-yellow-500 hover:text-white sm:px-4 py-1 sm:-my-4 rounded-l-md border-r-orange-400"
            @click="$emit('emit_event_edit')">修改</button>

        <button type="button" class="flex-none hover:bg-red-500 border-2 border-red-500
            focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 
            text-red-500 hover:text-white sm:px-4 py-1 sm:-my-4 rounded-r-md 
            border-l-0" @click="$emit('emit_event_delete')">刪除</button>    
    </div>`,
};

















