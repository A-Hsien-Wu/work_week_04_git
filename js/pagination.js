const pagination = {
    template : `
    <nav aria-label="Page navigation" class="flex justify-center">
        <ul class="inline-flex">
            <li><button type="button" class="pagination-btn rounded-l-lg" 
                :disabled="!pages.has_pre"
                @click.prevent="$emit( 'emit_change_page' , (pages.current_page - 1))">
                Prev
            </button></li>
            <li><button type="button" class="pagination-btn pagination-btn-mobile" 
                :class="{ active : pages.current_page === item }"
                v-for="(item,i) in pages.total_pages" :key="i" 
                @click.prevent="$emit( 'emit_change_page' , item )">
                {{ item }}
            </button></li>
            <li><button type="button" class="pagination-btn rounded-r-lg"
                :disabled="pages.current_page === pages.total_pages"
                @click.prevent="$emit( 'emit_change_page' , (pages.current_page + 1) )">
                Next
            </button></li>
        </ul>
    </nav>`,
    props :[ 'pages' ],
}


export default pagination;