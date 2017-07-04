<template>
    <div class="page-navbar">
        <_header></_header>
        <div style="height:2px;"></div>
        <div class="checked_tab">
            <span :class="ind == 1 ? 'curr' : ''" data-ind="1" @click="changes">门店编码查询</span>
            <span :class="ind == 2 ? 'curr' : ''" data-ind="2" @click="changes">本月精品快递查询</span>
        </div>
    
        <div v-if="ind == 1">
            <!-- 老板名字 -->
            <mt-field v-model="user_name" label="老板名字" placeholder="请输入老板名字"></mt-field>
    
            <!-- 手机号 -->
            <mt-field v-model="mobile" label="老板手机号" placeholder="请输入老板手机号"></mt-field>
    
            <mt-button size="large" type="danger" @click.native="showData">查询</mt-button>
    
            <!-- 手机号 -->
            <div v-if="showCode" class="bot">
                <mt-field v-model="storeno" label="门店编码为：" readonly></mt-field>
            </div>
            <p class="tip">点击
                <router-link to="/history">历史订单</router-link> ， 进入出货系统历史查询</p>
        </div>
    
        <div v-if="ind == 2">
            <!--<mt-header title="本月精品快递查询" style="margin-top: 30px;"></mt-header>-->
            <!-- 第几公司 -->
            <mt-field v-model="store_code" label="门店编码" placeholder="请输入门店编码"></mt-field>
    
            <mt-button size="large" type="danger" @click.native="showOrder">查询</mt-button>
            <div v-if="orderData">
                <div v-if="itemList.length">
                    <div v-for="(item, index) in itemList" :key="item">
                        <mt-cell :title="item.boutique_name" style="min-height: 25px; padding-top: 10px;">{{item.buy_num}}{{item.unit}}</mt-cell>
                        <mt-cell title="快递单号" style="min-height: 25px; padding-bottom: 10px; border-bottom: 1px solid #eee;">{{item.expressno}}</mt-cell>
                    </div>
                </div>
                <div v-else class="nodata">暂无单号</div>
            </div>
        </div>
    </div>
</template>

<style>
.checked_tab {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
}

.checked_tab span {
    float: left;
    width: 50%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    box-sizing: border-box;
    background: #fff;
}

.checked_tab span.curr {
    background: #ef4f4f;
    color: #fff;
}

body {
    margin-top: 45px;
}

.bot .mint-field-core {
    font-size: 20px;
}

.tip {
    color: #999;
    padding-left: 10px;
    font-size: 16px;
}

.nodata {
    text-align: center;
    margin: 30px auto;
}
</style>


<script>
import _header from './header.vue'

export default {
    name: 'page-navbar',
    components: {
        _header
    },
    data: function () {
        return {
            ind: 1,
            storeno: '',
            store_code: '',
            company: '',
            user_name: '',
            mobile: '',
            orderData: false,
            showCode: false,
            itemList: [],

            options: [{
                value: '1',
                label: '第一公司'
            }, {
                value: '2',
                label: '第二公司'
            }, {
                value: '3',
                label: '第三公司'
            }, {
                value: '4',
                label: '第四公司'
            }, {
                value: '5',
                label: '第五公司'
            }, {
                value: '6',
                label: '第六公司'
            }, {
                value: '7',
                label: '第七公司'
            }, {
                value: '8',
                label: '第八公司'
            }]
        }
    },
    mounted: function () {

    },
    methods: {
        changes: function (e) {
            this.ind = e.srcElement.dataset.ind
        },
        // 查询门店编码
        showData: function () {
            var _this = this;
            this.Ajax.post('store', _this.Qs.stringify({ name: _this.user_name, company: _this.company, mobile: _this.mobile }))
                .then(function (response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.showCode = true;
                        _this.storeno = result.datas.storeno;
                    } else {
                        _this.showCode = false;
                        _this.storeno = '';
                        _this.tableData = [];
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 查询快递单号
        showOrder: function () {
            var _this = this;
            _this.orderData = true;
            _this.Ajax.post('express', this.Qs.stringify({ storeno: _this.store_code }))
                .then(function (response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.showCode = true;
                        _this.itemList = result.datas;
                    } else {
                        _this.tableData = [];
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>