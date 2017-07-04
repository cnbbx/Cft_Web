<template>
    <div>
        <mt-header title="快递单号录入" style="position: fixed;"></mt-header>
        
        <div>
            
            <!-- 店铺编号 -->
            <mt-field v-model="storeno" label="店铺编号" placeholder="请输入店铺编号"></mt-field>
            <!-- 精品 -->
            <mt-cell title="精品名称" style="position:relative;">
                <el-select v-model="goodsName" placeholder="请选择" style="width:70%;position:absolute;right:0;top:.4rem;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </mt-cell>
            <!-- 日期 -->
            <!--<mt-field v-model="goodsName" label="发货日期" placeholder="请输入发货日期"></mt-field>-->
            <!--<mt-field label="选择日期">-->
            <span style="padding: 0 28px 0 10px;">选择日期</span>
            <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
            </el-date-picker>
            <!-- 单号 -->
            <mt-field v-model="orderCode" label="快递单号" placeholder="请输入快递单号"></mt-field>

            <mt-button size="large" type="danger" @click.native="inputOrder">录入</mt-button>

        </div>
    </div>
</template>

<style>
.mint-header {  top: 0; left: 0; width: 100%; z-index: 999;}
body { margin-top: 45px;}
</style>


<script>
    export default {
        data: function() {
            return {
                orderCode: '',
                goodsName: '',
                storeno: '',
                value2: '',
                options: [{
                    value: '1',
                    label: '夜露红酒'
                }, {
                    value: '2',
                    label: '尚爱沐浴露'
                }, {
                    value: '3',
                    label: '尚爱香体乳'
                }, {
                    value: '4',
                    label: '尚爱礼盒'
                }, {
                    value: '5',
                    label: '阿甘油'
                }, {
                    value: '6',
                    label: '艾依兰牙贴'
                }, {
                    value: '7',
                    label: '爱康康本草消毒液'
                }, {
                    value: '8',
                    label: '九朵卫生棉'
                }],
                pickerOptions1: {
                    disabledDate: function(time) {
                        return time.getTime() < new Date().getTime();
                    }
                }
            }
        },
        mounted: function() {

        },
        methods: {
            // 单号录入
            inputOrder: function(){
                var _this = this;
                this.Ajax.post('inputOrder', {order: _this.orderCode, goodsName: _this.goodsName, storeno: _this.storeno})
                .then(function(response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.$notify.success({
                            title: '消息',
                            message: '单号录入成功',
                            offset: 300
                        });
                    } else {
                        _this.$notify.success({
                            title: '消息',
                            message: '单号录入失败',
                            offset: 300
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            sureCode: function(){

            }
        }
    }
</script>