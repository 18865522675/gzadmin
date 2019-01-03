<template>
  <div class="g-module">
    <!--筛选-->
    <div class="kf-screen">
      <el-form class="kf-form">
        <div class="kf-row">
          <el-form-item label="角色名称" class="kf-form-item form-search">
            <el-input :value="sign.name" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="kf-bd" v-if="manageList.length">
      <el-tabs type="border-card" class="kf-sys-tabs">
        <el-tab-pane :label="item.module" class="kf-sys-tabs-pane" v-for="(item, index) in manageList" :key="index">
          <div class="kf-sys-tabs-head">
            <el-checkbox
              class="ml10"
              size="small"
              :indeterminate="item.isIndeterminate"
              v-model="item.checkAll"
              @change="check_all($event, index)"
              border
            >全选</el-checkbox>
          </div>
          <div v-for="(sub_item, sub_index) in item.submodules" :key="sub_index" class="kf-sys-tabs-group">
            <div class="kf-sys-tabs-item">
              <div class="kf-sys-tabs-label">【{{sub_item.name}}】</div>
              <el-checkbox
                :indeterminate="sub_item.isIndeterminate"
                v-model="sub_item.checkAll"
                @change="check_all($event, index, sub_index)"
              >全选</el-checkbox>
            </div>
            <el-checkbox-group class="kf-sys-tabs-item" v-model="sub_item.check">
              <el-checkbox
                v-for="(operate_item, operate_index) in sub_item.operate"
                :key="operate_index"
                :label="operate_item.id"
                @change="sel_change"
              >{{operate_item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="kf-sys-ft">
        <div class="kf-sys-btn" @click="onSubmit">保 存</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sign: {},
      manageList: []
    };
  },
  components: {},
  mounted() {
    this.sign = this.$route.params;
    console.log(this.sign);
    this.get_ajax();
  },
  methods: {
    //获取数据
    get_ajax() {
      this.$api.systemManagement
        .roleManagement_get_manage({
          id: this.sign.id
        })
        .then(res => {
          this.clean_up(res.data);
        });
    },
    //整理数据
    clean_up(res) {
      res.map(item => {
        let item_checkAll = false;
        let item_isIndeterminate = false;
        let item_number = 0;
        let item_sel_number = 0;

        item.submodules.map(sub_item => {
          let check = [];
          let checkAll = false;
          let isIndeterminate = false;

          if (sub_item.check) {
            check = sub_item.check;
          } else {
            sub_item.operate.map(operate_item => {
              if (operate_item.status) check.push(operate_item.id);
            });
          }

          if (check.length === sub_item.operate.length) {
            checkAll = true;
          } else if (check.length) {
            isIndeterminate = true;
          }

          item_number += sub_item.operate.length;
          item_sel_number += check.length;

          sub_item.check = check;
          sub_item.checkAll = checkAll;
          sub_item.isIndeterminate = isIndeterminate;
        });

        if (item_sel_number === item_number) {
          item_checkAll = true;
        } else if (item_sel_number) {
          item_isIndeterminate = true;
        }

        item.checkAll = item_checkAll;
        item.isIndeterminate = item_isIndeterminate;
      });
      this.manageList = res;
    },
    //选择
    sel_change() {
      this.clean_up(this.manageList);
    },
    //全选
    check_all(val, p_ind, ind) {
      let manageList = this.manageList;

      if (ind === undefined) {
        //一级全选
        manageList.map((item, index) => {
          if (p_ind === index)
            item.submodules.map(sub_item => {
              if (val) {
                let check = [];
                sub_item.operate.map(operate_item => {
                  check.push(operate_item.id);
                });
                sub_item.check = check;
              } else {
                sub_item.check = [];
              }
            });
        });
      } else {
        //二级全选
        manageList.map((item, index) => {
          if (p_ind === index)
            item.submodules.map((sub_item, sub_index) => {
              if (ind === sub_index) {
                if (val) {
                  let check = [];
                  sub_item.operate.map(operate_item => {
                    check.push(operate_item.id);
                  });
                  sub_item.check = check;
                } else {
                  sub_item.check = [];
                }
              }
            });
        });
      }
      this.clean_up(this.manageList);
    },
    onSubmit() {
      let manageList = this.manageList;
      let checkArr = [];

      manageList.map(item => {
        item.submodules.map(sub_item => {
          if (sub_item.check.length) checkArr = checkArr.concat(sub_item.check);
        });
      });

      this.$api.systemManagement
        .roleManagement_save({
          id: this.sign.id,
          permissionIds: checkArr.join(",")
        })
        .then(() => {
          this.$message.success("保存成功");
          this.$router.go(-1);
        });
    }
  }
};
</script>
