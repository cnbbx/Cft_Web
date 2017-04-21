<template>
  <el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="commodity_time" label="日期" sortable>
    </el-table-column>
    <el-table-column prop="boutique_name" label="货品名" sortable>
    </el-table-column>
    <el-table-column prop="nums" label="数量" :formatter="formatter">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted: function() {
      var _this = this;
      this.Ajax.post('history', this.Qs.stringify({
          mobile: _this.Cookie.get('mobile')
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
    methods: {
      formatter(row, column) {
        return row.buy_num + row.unit;
      }
    }
  }
</script>