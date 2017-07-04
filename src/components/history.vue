<template>
    <div>
        <_header></_header>
        <!-- 门店编码 -->
        <mt-field v-model="inputval.storeno" label="门店编码" placeholder="请输入门店编码">
            <el-button type="primary" icon="time" @click.native="sureCode" >确认编码</el-button>
        </mt-field>

        <el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="cft" label="第几代" :formatter="cft_formatter"></el-table-column>
            <el-table-column prop="commodity_time" label="日期" sortable></el-table-column>
            <el-table-column prop="boutique_name" label="货品名"></el-table-column>
            <el-table-column prop="nums" label="数量" :formatter="formatter"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import _header from './header.vue'

    export default {
        data: function() {
            return {
                tableData: [],
                inputval: {
                    storeno: this.Cookie.get('storeno')
                }
            }
        },
        components: {
            _header
        },
        mounted: function() {
            // var _this = this;
            // this.Ajax.post('history', this.Qs.stringify({
            //         mobile: _this.Cookie.get('mobile')
            //     }))
            //     .then(function(response) {
            //         var result = response.data;
            //         if (result.code == 1) {
            //             _this.tableData = result.datas;
            //         } else {
            //             _this.tableData = [];
            //         }
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });
        },
        methods: {
            sureCode: function(){
                var _this = this;
                this.Ajax.post('history', this.Qs.stringify({
                    storeno: _this.inputval.storeno
                }))
                .then(function(response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.tableData = result.datas;
                    } else {
                        _this.tableData = [];
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            formatter: function(row, column) {
                return row.buy_num + row.unit;
            },
            cft_formatter: function(row, column) {
                return row.cft + "代";
            },
        }
    }
</script>