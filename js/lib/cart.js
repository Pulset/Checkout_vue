new Vue({
	el:'.app',
	mounted:function () {
		// this.getData();
		this.$nextTick(function(){
			this.getData();
		});
	},
	data:{
		productList:[],
		totalMoney:0,
		checkAllFlag:false,
		isdel:false,
		curProduct:0
	},
	filters:{
		formatPrice:function(value){
			return '￥'+value.toFixed(2);
		}
	},
	computed:{
		
	},
	methods:{
		getData:function () {
		this.$http.get("data/cart.json").then(response=>{
				this.productList = response.body.result.productList;
				this.totalMoney=response.body.result.totalMoney;
				
			});
		},
		sub:function(index){
			this.productList[index].productQuentity--;
			if (this.productList[index].productQuentity<1) {

				this.productList[index].productQuentity=1;
			}
			this.calTotalMoney();
		},
		add:function (index) {
			this.productList[index].productQuentity++;
			this.calTotalMoney();
		},
		del:function(index){
			this.isdel=!this.isdel
			this.curProduct=index;
		},
		delProduct:function () {
			this.productList.splice(this.curProduct,1);
			this.isdel=!this.isdel;
			this.calTotalMoney();
		},
		check:function(item){
			if (typeof(item.isChecked)=='undefined') {
				this.$set(item,'isChecked',true);
			}else{
				item.isChecked=!item.isChecked;
				this.checkAllFlag=false;
			}
			this.calTotalMoney();
		},
		selectAll:function(flag){
			this.checkAllFlag=flag;
			var _this=this;
			this.productList.forEach(function (item,index) {
				if (typeof(item.isChecked)=='undefined') {
					_this.$set(item,'isChecked',_this.checkAllFlag)
				}else{
					item.isChecked=_this.checkAllFlag;
				}
			});
			this.calTotalMoney();
		},
		calTotalMoney:function () {
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function (item,index) {
				if (item.isChecked) {
					_this.totalMoney+=item.productPrice*item.productQuentity;
				}
			});
		}
		
	}
})