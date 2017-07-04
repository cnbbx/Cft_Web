<template>
    <div>
        <mt-header title="快递单号录入" style="position: fixed;"></mt-header>
        
        <div>
            
            <!-- 店铺编号 -->
            <mt-field v-model="orderCode" label="订单编号" placeholder="请输入订单编号+商品ID"></mt-field>
            
            <!-- 单号 -->
            <mt-field v-model="expressno" label="快递单号" placeholder="请输入快递单号"></mt-field>

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
                expressno: '',
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
                this.Ajax.post('/inputorder/', _this.Qs.stringify({ordercode: _this.orderCode, expressno: _this.expressno}))
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