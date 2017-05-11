<template>
  <div class="page-navbar">
    <div style="height:2px;"></div>
    <el-alert title="本人已经确认知晓财富通专柜货品为精品专供，出货不退不换，默认快递方式，所有运费自付！ " type="error"> </el-alert>
    <mt-field v-model="inputval.mobile" label="老板手机号" placeholder="请输入老板手机号" :state="errors.mobile ? 'error': 'success'">
      <el-button type="primary" icon="time" @click.native="loaddata" :loading="loading"></el-button>
    </mt-field>
    <mt-field v-model="inputval.store_name" label="美容院店名" placeholder="请输入美容院店名"></mt-field>
    <mt-field v-model="inputval.name" label="老板名字" placeholder="请输入老板名字" :state="errors.name ? 'error': 'success'"></mt-field>
    <mt-cell title="隶属公司" style="position:relative;">
      <el-select v-model="inputval.company" placeholder="请选择" style="width:70%;position:absolute;right:0;">
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </mt-cell>
    <mt-field v-model="inputval.commodity_name" label="收货人姓名" placeholder="请输入收货人姓名"></mt-field>
    <mt-field v-model="inputval.commodity_mobile" label="收货人手机号" placeholder="请输入收货人手机号" type="tel" :state="errors.commodity_mobile ? 'error': 'success'"></mt-field>
    <mt-cell title="收货地址" :value="address" @click.native="showPicker"></mt-cell>
    <my-address :showAddressPicker="showAddressPicker" @save-address="saveAddress" @hide-picker="hidePicker" :init="address"></my-address>
    <mt-field v-model="inputval.commodity_address" label="详细地址" placeholder="请输入详细地址"></mt-field>
    <mt-navbar class="page-part" v-model="inputval.few">
      <mt-tab-item id="1">财富通一代</mt-tab-item>
      <mt-tab-item id="2">财富通二代</mt-tab-item>
      <mt-tab-item id="3">财富通三代</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="inputval.few">
      <mt-tab-container-item id="1">
        <mt-cell :label="item.boutique_name" v-for="item in inputval.first">
          <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
          <span>{{item.unit}}</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell :label="item.boutique_name" v-for="item in inputval.second">
          <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
          <span>{{item.unit}}</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell :label="item.boutique_name" v-for="item in inputval.third">
          <el-input-number size="small" v-model="item.num" @change="handleChange" :min="0" :max="500"></el-input-number>&nbsp;
          <span>{{item.unit}}</span>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-field v-model="inputval.remark" label="备注" placeholder="请输入备注" type="textarea" rows="4" style="border:1px solid #efefef"></mt-field>
    <mt-button size="large" type="danger" @click.native="sendpost">提交</mt-button>
  </div>
</template>

<style>
.mint-tab-container {
  margin: 0.1em 0em;
}
</style>

<script>
import MyAddress from '../plugin/address-picker/Address.vue'

export default {
  name: 'page-navbar',
  components: {
    MyAddress
  },
  data: function () {
    return {
      loading: false,
      address: '北京-北京市-东城区',
      showAddressPicker: false,
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
      }, {
        value: '9',
        label: '第九公司'
      }, {
        value: '10',
        label: '第十公司'
      }],
      errors: {
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
      message: '这是个公测版本，有问题我们改进！',
      offset: 300
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
    sendpost: function () {
      // @TODO 保存出货记录
      var _this = this;
      var _address = _this.inputval.commodity_address;
      _this.inputval.commodity_address = _this.address + '-' + _address;
      var IsSub = true;
      // 检测开始
      _this.CheckStr('mobile', _this.inputval.mobile, function () {
        _this.errors.mobile = true;
        IsSub = false;
      }, function () {
        _this.errors.mobile = false;
        IsSub = true;
      });
      _this.CheckStr('chinese', _this.inputval.name, function () {
        _this.errors.name = true;
        IsSub = false;
      }, function () {
        _this.errors.name = false;
        IsSub = true;
      });
      _this.CheckStr('mobile', _this.inputval.commodity_mobile, function () {
        _this.errors.commodity_mobile = true;
        IsSub = false;
      }, function () {
        _this.errors.commodity_mobile = false;
        IsSub = true;
      });
      // 检测结束
      if (IsSub)
        _this.Ajax.post('save', _this.Qs.stringify(_this.inputval))
          .then(function (response) {
            var result = response.data;
            if (result.code == 1) {
              _this.$notify.info({
                title: '消息',
                message: '提交发货信息成功！',
                offset: 300
              });
              setTimeout(function () {
                location.href = "#/history";
              }, 1000);
            } else {
              _this.$message.error('提交发货信息失败！');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      this.inputval.commodity_address = _address;
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