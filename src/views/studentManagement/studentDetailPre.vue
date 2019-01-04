<template>
    <div class="g-module">
        <el-card>
            <!--筛选-->
            <div class="kf-screen">
                <el-form class="kf-form">
                    <div class="kf-row">
                        <el-form-item label="学生名称" class="kf-form-item form-search">
                            <el-input :value="$route.params.studentName" disabled></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="kf-bd">
                <!--tab切换-->
                <div class="kf-table-tab">
                    <div class="kf-table-tab-box">
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 0}" data-ind="0" @click="change_table_tab">课件列表</div>
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 1}" data-ind="1" @click="change_table_tab">习题列表</div>
                        <div class="kf-table-tab-item" :class="{on: table_tab_ind === 2}" data-ind="2" @click="change_table_tab">图书列表</div>
                    </div>
                </div>

                <!--分页start-->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        class="kf-pagination">
                </el-pagination>
                <!--分页end-->

            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "studentDetailPre",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {},
        created() {
        },
        destoryed() {
        }
    }
</script>

<style scoped>

</style>