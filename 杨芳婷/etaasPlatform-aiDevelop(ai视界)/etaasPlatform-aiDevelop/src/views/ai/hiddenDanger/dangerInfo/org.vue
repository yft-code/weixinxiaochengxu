<template>
  <div class="org_container">
    <div class="search">
      <el-select
             size="small"
              @change="dangerChange"
              style="width:100%"
              :popper-append-to-body="false"
              v-model="value"
              placeholder="请选择隐患库"
            >
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
    </div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          ref="tree"
          v-loading="loading"
          :data="dangerTree"
          class="tree-line filter-tree"
          node-key="id"
          :filter-node-method="filterNode"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="deptNodeClick"
        >
          <div slot-scope="{ node, data }" class="custom-tree-node tree">
           
            <div v-if="node.level===1" style="color:#0A1933;font-size:16px;font-weight:550">{{ node.label }}</div>
            <div v-else-if="node.level===2" style="color:black">{{ node.label }}</div>
            <div v-else style="color:#9FA6B0">{{ node.label }}</div>
            <div class="dangersBtn">
              <el-button type="text"> <i class="el-icon-more el-icon--right"></i></el-button>
              <div class="btn-one">
                <div class="btn-word" @click.stop="levelAppend(node, data)"><span>新增</span></div>
                <div class="btn-word" @click.stop="append(node,data)"><span>修改</span></div>
                <div class="btn-word"  @click.stop="deleteOrg(node,data)"><span>删除</span></div>
              </div>
             
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <!-- 编辑和添加-->
    <add-storehouse 
    :name="name"
    :parentId="parentId" 
    :innerVisible="innerVisible" 
    @close-callback="close" 
    @getSingleTree="getSingleTree"
    :title="title"
    :level="level"
    :type="type">
  </add-storehouse>
    <div>
    </div>
  </div>
</template>

<script>
import addStorehouse from './addStorehouse.vue'
import * as api from '@/api/ai/org'
import {gethiddenList} from '@/api/ai/dangerlibManage.js'
import AddStorehouse from './addStorehouse.vue'
export default {
  name: 'Org',
  components: {
    AddStorehouse
  },
  data() {
    return {
    type:'',
    name:'',
    id:0,
    list:[],
    innerVisible:false,
    visible:false,
      permissionId: '',
      nodeId: '',
      isLevel: false,
      company: '',
      parentId: '',
      status: '0',
      organizationId: '',
      orgName: '',
      id: '',
      edit: false,
      loading: false,
      form: {},
      title: '',
      visible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      value: '',
      flag: false,
      code:'',
      level:'',
      troubleId:'',
      data:[],
      dangerTree:[],
  //data: JSON.parse(JSON.stringify(data))
    }
  },
  created() {
    this.getOrangize()
    this.getHiddenList()
  },
  methods: {
    // 添加，编辑和删除属性列表的数据
    getSingleTree(){
      this.loading = true
      api.getOrganization().then(res => {
        this.dangerTree=[]
        if(res&&res.result&&res.result.length>0){
        res.result&&res.result.length>0&&res.result.map(item=>{
          if(item.id===this.value){
            this.dangerTree.push(item)
          }
        })
        }
        this.getHiddenList()
        this.loading = false
      }).catch
    },
    getHiddenList(){
           let params={
            limit: 9999,
             current: 1
           }
           gethiddenList(params).then(res=>{
            let list=[]
            res&&res.result&&res.result.list&&res.result.list.map(item=>{
                list.push({
                  name:item.name,
                  id:item.id,
                  code:item.code
                })
            })
            this.list=list
           })
      },
      dangerChange(val){
        this.dangerTree=[]
        this.data.map(item=>{
          if(item.id===val){
            this.dangerTree.push(item)
          }
        })
        this.list.map(item=>{
          if(item.id===val){
          this.code=item.code
          this.troubleId=item.id
          }
        })
       this.sendMessage() 
      },
    // 关闭弹框
    close(){
       this.innerVisible=false
    },

    // 删除
    deleteOrg(node,data) {
      const params = { id: data.id }
      this.$confirm(node.isLeaf?'确定要删除隐患库及隐患信息?删除后将不可恢复':'确定要删除隐患库及隐患信息?删除后子节点也将被删除且不可恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteById(params).then((res) => {
          if(res.code===0){
            this.getHiddenList()
            this.getSingleTree()
             this.$message({
               type: 'success',
                message: '删除成功'
              })
             }else{
                this.$message({
               type: 'warning',
                message: '删除失败'
              })
             }
         }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 将id传给父组件
    sendMessage() {
      this.$emit('fetch', this.code,this.troubleId)
    },
    // 搜索
    search() {
      this.$refs.tree.filter(this.value)
    },

    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
  
    // 点击当前节点获取id
    deptNodeClick(item, e) {
      if(e.level===1){
        this.code=item.code
      }
      this.troubleId=item.id
      this.$emit('changePhoto')
      this.sendMessage()
    },

    // 编辑隐患库
    append(node, data) {
        this.type='edit'
        this.innerVisible=true
        this.title = '编辑隐患库'
        this.level=node.level
        this.parentId = data.id
        this.name=data.name
    },

    // 获取树
    getOrangize() {
      this.loading = true
      api.getOrganization().then(res => {
        if(res&&res.result&&res.result.length>0){
         let data = [] 
         this.dangerTree=[]
         data=res.result
         this.code=res.result&&res.result[0]&&res.result[0].code
         this.troubleId=res.result&&res.result[0]&&res.result[0].id
         this.value=this.troubleId
         this.dangerTree.push(res.result&&res.result[0])
         this.sendMessage()
         this.data = data
        }
        this.loading = false
      }).catch
    },

    // 添加
    levelAppend(node, data) {
      this.innerVisible=true
      this.type='add'
      this.level=node.level+1
      this.parentId = data.id
      this.title = '新增隐患库'
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.org_container{
  margin-right:20PX;
  // background-color: burlywood;
  .custom-tree-container{
    margin-top: 10PX;
    min-height: 100px;
  }
  .block{
    width: 100%;
    height: 100%;
  }
  .search{
    margin-left: 16PX;
  }
  .add_form{
    width: 99%;
    margin-top: -27PX;
    border-top: 1PX solid  #f3f3f5;
  }
  .inner_form{
     width: 80%;
     margin: 20PX auto;
  }
.tree{
  height: 35PX;
  width:100%;
  display:flex;
  line-height: 35PX;
  justify-content: space-between;
}

.el-icon-more{
  color:lightgrey;
}
.point {
  height: 100%;
  line-height: 100%;
}
.dangersBtn{
  padding-right:15PX;
  // opacity: 0;
  display: none;
  border: none;
}

.btn-one{
    // opacity: 0;
    display: none;
    position:absolute;
    margin-left:-40PX;
    margin-top:-10PX;
    // background: #fff;
    border:1px solid rgba(33, 72, 141, 0.2);
    box-shadow: 0px 0px 10px -3px rgba(33, 72, 141, 0.6);
    z-index:1000;
  }

  .btn-word{
    font-size: 14PX;
    padding:5PX 20PX;
    color: darkgray;
    &:hover{
      color: #fff !important;
      background-color: #347FFF !important;
    }
  }
  .dangersBtn:hover{
    .btn-one{
      display: block;
    }
  }
  .btn-one:hover{
    .dangersBtn{
      display: block;
      }
  }
  .custom-tree-node{
    &:hover{
      .dangersBtn{
        display: block;
      }
    }
  }

::v-deep .el-dropdown-menu__item--divided:before {
    content: '';
    height: 0PX;
    display: block;
    border-bottom: 1PX dotted;
    margin: 0 -20PX;
    background-color: #FFF;
}
}
</style>
<style lang="scss">
// .drop_down{
//    ::v-deep .el-popper .popper__arrow {
//     display: none !important;
// }
// }
.el-popper .popper__arrow {
    display: none !important;
}
.newDrop{
    padding: 0PX;
  }
  .new-item{
   color: darkgray;
  }
  .new-item:hover{
    color: #fff !important;
      background-color: #347FFF !important;
  }
 .tree-line{
  padding-bottom:150PX;
    max-height: 2000px;
     overflow-y:hidden;
     overflow-x:auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
            width:10px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 10px;
            scrollbar-arrow-color:red;

        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
            scrollbar-arrow-color:red;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
 .el-tree-node {
      position: relative;
      padding-left: 10PX;
    }
    .vue-treeselect__menu{
      display: block;
    }
    // 子集像右偏移 给数线留出距离
    .el-tree-node__children {
      overflow: visible !important;
      padding-left: 10PX;
    }
 .el-tree-node__content {
    line-height: 30PX;
    height: 30PX;
    padding-left: 0PX !important;
}
    //这是竖线
    .el-tree-node :last-child:before {
      height: 25PX;
    }
    .el-tree > .el-tree-node:before {
      border-left: none;
    }
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    //这自定义的线 的公共部分
    .el-tree-node:before,
    .el-tree-node:after {
      content: "";
      left: -4PX;
      position: absolute;
      right: auto;
      border-width: 1PX;
    }
    .tree :first-child .el-tree-node:before {
      border-left: none;
    }
    // 竖线
    .el-tree-node:before {
      border-left: 1PX solid #e3e3e3;
      bottom: 0PX;
      height: 100%;
      top: -8PX;
      width: 1PX;
      left: 2PX;
    }
    //横线
    .el-tree-node:after {
      border-top: 1PX solid #e3e3e3;
      height: 20PX;
      top: 17PX;
      width: 12PX;
      left: 2PX;
    }
    .el-tree-node__expand-icon.is-leaf {
      width: 8PX;
    }
    //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
    // .el-tree-node__content > .el-tree-node__expand-icon {
    //   display: none;
    // }
    //每一行的高度
    .el-tree-node__content {
      line-height: 30PX;
      height: 30PX;
    }
  }
  //去掉最上级的before  after 即是去电最上层的连接线
   .el-tree > div {
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
}
</style>
