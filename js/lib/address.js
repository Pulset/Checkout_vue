new Vue({
	el:'.container',
	mounted:function(){
		this.getData();
	},
	data:{
		address:[],
		limitNum:3,
		i:0,
		currentCard:0,
		shippingMethod:1
		
	},
	methods:{
		getData:function () {
			var _this=this;
			this.$http.get('data/address.json').then(function (res) {
				_this.address=res.body.result;
			});
		},
		more:function () {
			this.i++;
			if(this.i%2){
				this.limitNum=this.address.length;
			}else{
				this.limitNum=3;
			}
			
		},
		setDef:function (index) {
			this.address.forEach(function (item,index) {
				item.isDefault=false;
			});
			this.address[index].isDefault=true;
		},
		del:function (index) {
			this.address.splice(index,1);
		}
		
	},
	computed: {
		  addressFilter: function () {
		    return this.address.slice(0, this.limitNum)
		  }
	}

})