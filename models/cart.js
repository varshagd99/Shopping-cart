module.exports=function Cart(oldCart){
    this.items=oldCart.items || {}
    this.totalQty=oldCart.totalQty || 0
    this.totalPrice=oldCart.totalPrice || 0
    this.add=function(item,id){
        let storeditem=this.items[id]
        if(!storeditem){
            storeditem=this.items[id]={item:item,qty:0,price:0}
        }
        storeditem.qty++
        storeditem.price=storeditem.item.price*storeditem.qty
        this.totalQty++
        this.totalPrice+=storeditem.item.price
    }
    this.reduceByOne=function(id){
this.items[id].qty--
this.items[id].price-=this.items[id].item.price
this.totalQty--
this.totalPrice-=this.items[id].item.price
if(this.items[id].qty<=0){
    delete this.items[id]
}
    }

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    this.generateArray=function(){
        let arr=[]
        for(let id in this.items)
        {
            arr.push(this.items[id])
        }
        return arr
    }

}