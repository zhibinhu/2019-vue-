<template>
    <Breadcrumb>
        <BreadcrumbItem 
            v-for="item in currentPath" 
            :href="item.path" 
            :key="item.name"
        >{{ itemTitle(item) }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    methods: {
        itemTitle (item) {
            console.log(this.$t);
            if (typeof item.title === 'object') {
                if(this.$t){
                    return this.$t(item.title.i18n);
                }
            } else {
                return item.title;
            }
        }
    }
};
</script>

