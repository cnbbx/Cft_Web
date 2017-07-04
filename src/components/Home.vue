<template>
    <div class="page-navbar" v-loading.fullscreen.lock="fullscreenLoading">
        <_header></_header>
        <div style="height:2px;"></div>
        <el-alert title="本人已经确认知晓财富通专柜货品为精品专供，出货不退不换，默认快递方式，所有运费自付！ " type="error"> </el-alert>
    
        <!-- 门店编码 -->
        <mt-field v-model="inputval.storeno" label="门店编码" placeholder="请输入门店编码" :state="errors.storeno ? 'error': 'success'">
            <el-button type="primary" icon="time" @click.native="sureCode" :loading="loading">确认编码</el-button>
        </mt-field>

        <!-- 老板手机号码 -->
        <mt-field v-model="inputval.mobile" label="老板手机号" :disabled="nowrite" placeholder="请输入老板手机号" :state="errors.mobile ? 'error': 'success'">
            <!--<el-button type="primary" icon="time" @click.native="loaddata" :loading="loading">加载数据</el-button>-->
        </mt-field>
    
        <!-- 美容院店名 -->
        <mt-field v-model="inputval.store_name" label="美容院店名" :disabled="nowrite" placeholder="请输入美容院店名"></mt-field>
    
        <!-- 老板名字 -->
        <mt-field v-model="inputval.name" label="老板名字" :disabled="nowrite" placeholder="请输入老板名字" :state="errors.name ? 'error': 'success'"></mt-field>
    
        <!-- 隶属公司 -->
        <mt-field v-model="inputval.company" label="隶属公司" :disabled="nowrite" placeholder="请输入隶属公司" :state="errors.company ? 'error': 'success'"></mt-field>
        <!--<mt-cell title="隶属公司" style="position:relative;">
            <el-select v-model="inputval.company" placeholder="请选择" style="width:70%;position:absolute;right:0;top:.4rem;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </mt-cell>-->
    
        <!-- 收货人姓名 -->
        <mt-field v-model="inputval.commodity_name" label="收货人姓名" placeholder="请输入收货人姓名"></mt-field>
    
        <!-- 收货人手机号 -->
        <mt-field v-model="inputval.commodity_mobile" label="收货人手机号" placeholder="请输入收货人手机号" type="tel" :state="errors.commodity_mobile ? 'error': 'success'"></mt-field>
    
        <!-- 收货地址 -->
        <mt-cell title="收货地址" :value="address" @click.native="showPicker"></mt-cell>
        <my-address :showAddressPicker="showAddressPicker" @save-address="saveAddress" @hide-picker="hidePicker" :init="address"></my-address>
    
        <!-- 详细地址 -->
        <mt-field v-model="inputval.commodity_address" label="详细地址" placeholder="请输入详细地址" :state="errors.commodity_address ? 'error': 'success'"></mt-field>
    
        <mt-navbar class="page-part" v-model="inputval.few">
            <mt-tab-item id="1">财富通一代</mt-tab-item>
            <mt-tab-item id="2">财富通二代</mt-tab-item>
            <mt-tab-item id="3">财富通三代</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="inputval.few">
            <mt-tab-container-item id="1">
                <mt-cell :label="item.boutique_name" v-for="item in inputval.first" :key="item.id">
                    <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
                    <span>{{item.unit}}</span>
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell :label="item.boutique_name" v-for="item in inputval.second" :key="item.id">
                    <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
                    <span>{{item.unit}}</span>
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell :label="item.boutique_name" v-for="item in inputval.third" :key="item.id">
                    <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
                    <span>{{item.unit}}</span>
                </mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    
        <!-- 备注 -->
        <mt-field v-model="inputval.remark" label="备注" placeholder="请输入备注" type="textarea" rows="4" style="border:1px solid #efefef"></mt-field>
    
        <mt-button size="large" type="danger" @click.native="showData" :disabled="issubmit">确认</mt-button>
        <div class="showData" v-if="showPop">
            <div class="mask"></div>
            <div class="content">
                <p class="title">清单列表({{inputval.few == 1 ? '一代': inputval.few == 2 ? '二代' : '三代'}})</p>
                <p class="deInfo">{{inputval.name}}-{{inputval.mobile}}-{{inputval.store_name}}</p>
                <p class="deInfo">{{inputval.commodity_address}}</p>
                <div class="list">
                    <mt-cell :label="item.boutique_name" v-for="item in inputval.first" v-if="inputval.few == 1 && item.num != 0" :key="item.id">
                        <span>{{item.num}}</span>&nbsp;
                        <span>{{item.unit}}</span>
                    </mt-cell>
                    <mt-cell :label="item.boutique_name" v-for="item in inputval.second" v-if="inputval.few == 2 && item.num != 0" :key="item.id">
                        <span>{{item.num}}</span>&nbsp;
                        <span>{{item.unit}}</span>
                    </mt-cell>
                    <mt-cell :label="item.boutique_name" v-for="item in inputval.third" v-if="inputval.few == 3 && item.num != 0" :key="item.id">
                        <span>{{item.num}}</span>&nbsp;
                        <span>{{item.unit}}</span>
                    </mt-cell>
                </div>
                <div class="tijiao">
                    <mt-button size="large" type="danger" @click.native="sendpost" :disabled="issubmit">提交</mt-button>
                    <mt-button size="large" type="danger" @click.native="cancel" :disabled="issubmit">取消</mt-button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style>
.showData {position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 1;}
.showData .mask {position: absolute;left: 0;top: 0;width: 100%;height: 100%; background: rgba(0, 0, 0, .1); z-index: 1;}
.showData .content {background: #fff; z-index: 99; width: 90%; margin: auto;border-radius: 5px; position: relative; height: 400px; padding-top: 1px; margin-top: calc((100vh - 400px)/2)}
.showData .content .title{text-align: center; margin: 10px 0;}
.showData .content .deInfo{margin: 0 10px;}
.showData .content .list{height: 240px; overflow-y: auto;}
.showData .content .tijiao{margin: 20px auto; width: 90%;}
.showData .content .tijiao button{margin: 0 10px; width: 40%; display: inline-block;}

.mint-tab-container {
    margin: 0.1em 0em;
}
.el-notification.jinge {
    top: 200px!important;
}

.jinge .el-notification__icon {
    font-size: 60px;
    width: 60px;
    height: 60px;
}

.jinge .el-notification__group.is-with-icon {
    margin-left: 70px;
}

.jinge .el-notification__group .el-notification__title,
.jinge .el-notification__group .el-notification__content {
    font-size: 30px;
    line-height: 30px;
}
</style>

<script>
import MyAddress from '../plugin/address-picker/Address.vue'
import _header from './header.vue'

export default {
    name: 'page-navbar',
    components: {
        MyAddress,
        _header
    },
    data: function () {
        return {
            fullscreenLoading: false,
            issubmit: false,
            loading: false,
            address: '北京-北京市-东城区',
            showAddressPicker: false,
            showPop: false,
            nowrite: true,
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
            }],
            errors: {
                storeno: '',
                name: '',
                mobile: '',
                company: '',
                store_name: '',
                remark: '',
                commodity_name: '',
                commodity_mobile: '',
                commodity_address: ''
            },
            inputval: {
                storeno: '',
                name: '',
                mobile: this.Cookie.get('mobile'),
                company: '',
                store_name: '',
                few: '1',
                remark: '',
                commodity_name: '',
                commodity_mobile: '',
                commodity_address: '',
                first: [],
                second: [],
                third: []
            }
        }
    },
    mounted: function () {
        var _this = this;
        _this.$notify.info({
            title: '消息',
            message: '注意事项：请确认您出几代精品，不清楚联系您的服务老师。',
            offset: 300,
            customClass: 'jinge'
        });
        // @TODO 获取所有精品类型
        this.Ajax.post('getboutique')
            .then(function (response) {
                var result = response.data;
                _this.inputval.first = result.datas.few_one;
                _this.inputval.second = result.datas.few_two;
                _this.inputval.third = result.datas.few_three;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        sureCode: function(){
            var _this = this;
            _this.Ajax.post('getlastrecord', _this.Qs.stringify({storeno: _this.inputval.storeno}))
                .then(function (response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.inputval.mobile = result.datas.commodity_mobile;
                        _this.inputval.company = '第' + result.datas.company + '公司';
                        _this.inputval.store_name = result.datas.store_name;
                        _this.inputval.name = result.datas.name;
                        _this.nowrite = false;

                        _this.$notify.success({
                            title: '消息',
                            message: '信息获取成功！',
                            offset: 300,
                            customClass: 'jinge'
                        });

                        _this.Cookie.set('storeno', _this.inputval.storeno);
                    } else {
                        _this.$notify.success({
                            title: '消息',
                            message: '信息获取失败！',
                            offset: 300,
                            customClass: 'jinge'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleChange: function (value) {
            console.log(value);
        },
        hidePicker: function () {
            // 接受子组件关闭popup事件
            this.showAddressPicker = false
        },
        showPicker: function () {
            this.showAddressPicker = !this.showAddressPicker
        },
        saveAddress: function (val) {
            // 从子组件接受返回所选值 val
            this.address = val
            this.showAddressPicker = !this.showAddressPicker
        },
        showData: function(){
            // @TODO 保存出货记录
            var _this = this;
            _this.issubmit = true;
            var _address = _this.inputval.commodity_address;
            _this.inputval.commodity_address = _this.address + '-' + _address;
            var IsSub = true;

            // 检测老板手机号码不能为空
            _this.CheckStr('mobile', _this.inputval.mobile, function () {
                _this.errors.mobile = true;
                IsSub = false;
            }, function () {
                _this.errors.mobile = false;
                // IsSub = true;
            });

            // 检测老板名字不能为空
            _this.CheckStr('chinese', _this.inputval.name, function () {
                _this.errors.name = true;
                IsSub = false;
            }, function () {
                _this.errors.name = false;
                // IsSub = true;
            });

            // 检测收货人手机号码不能为空
            _this.CheckStr('mobile', _this.inputval.commodity_mobile, function () {
                _this.errors.commodity_mobile = true;
                IsSub = false;
            }, function () {
                _this.errors.commodity_mobile = false;
                // IsSub = true;
            });

            // 检测详细地址不能为空
            _this.CheckStr('required', _address, function () {
                _this.errors.commodity_address = true;
                IsSub = false;
            }, function () {
                _this.errors.commodity_address = false;
                // IsSub = true;
            });

            // 检测结束
            if (IsSub) {
                _this.issubmit = false;
                _this.showPop = true;
            }else{
                setTimeout(function () {
                    _this.issubmit = false;
                }, 3000);
            }
        },
        cancel: function(){
            this.showPop = false;
        },
        sendpost: function () {
            var _this = this;
            _this.fullscreenLoading = true;
            setTimeout(function () {
                _this.fullscreenLoading = false;
            }, 5000);
            _this.Ajax.post('save', _this.Qs.stringify(_this.inputval))
                .then(function (response) {
                    var result = response.data;
                    if (result.code == 1) {
                        _this.$notify.success({
                            title: '消息',
                            message: '提交发货信息成功！',
                            offset: 300,
                            customClass: 'jinge'
                        });
                        setTimeout(function () {
                            location.href = "/history";
                        }, 1000);
                        _this.fullscreenLoading = false;
                    } else {
                        _this.fullscreenLoading = false;
                        if (result.msg == 98) {
                            _this.$message.error('合伙人不存在，请联系您的服务老师！');
                            _this.issubmit = false;
                        } else if (result.msg == 90) {
                            _this.$message.error('您没有参与一代精品，请您联系您的服务老师！');
                            _this.issubmit = false;
                        } else if (result.msg == 91) {
                            _this.$message.error('您没有参与二代精品，请您联系您的服务老师！');
                            _this.issubmit = false;
                        } else if (result.msg == 92) {
                            _this.$message.error('您没有参与三代精品，请您联系您的服务老师！');
                            _this.issubmit = false;
                        } else {
                            _this.$message.error('提交发货信息失败！');
                            _this.issubmit = false;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            // this.inputval.commodity_address = _address;
        },
        loaddata: function () {
            // @TODO 获取老板上一次出货记录
            var _this = this;
            var IsSub = true;
            _this.CheckStr('mobile', _this.inputval.mobile, function () {
                _this.errors.mobile = true;
                IsSub = false;
            }, function () {
                _this.errors.mobile = false;
                IsSub = true;
            });
            if (IsSub) {
                _this.loading = true;
                _this.Cookie.set('mobile', _this.inputval.mobile, 1);
                this.Ajax.post('getlastrecord', this.Qs.stringify({
                    mobile: _this.inputval.mobile
                }))
                    .then(function (response) {
                        var result = response.data;
                        if (result.code == 1) {
                            _this.$message({
                                message: '加载信息成功！',
                                type: 'success'
                            });
                            _this.inputval.store_name = result.datas.store_name;
                            _this.inputval.company = result.datas.company;
                            _this.inputval.name = result.datas.name;
                            _this.inputval.few = result.datas.few + "";
                            _this.inputval.commodity_name = result.datas.commodity_name;
                            _this.inputval.commodity_mobile = result.datas.commodity_mobile;
                            _this.address = result.datas.commodity_address.split("-", 3).join('-');
                            _this.inputval.commodity_address = result.datas.commodity_address.replace(result.datas.commodity_address.split("-", 3).join('-') + '-', '');
                        } else {
                            _this.$message.error('加载信息错误！');
                        }
                        _this.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                        _this.loading = false;
                    });
            }
        }
    }
};
</script>