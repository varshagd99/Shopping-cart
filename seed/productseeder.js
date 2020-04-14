const product=require('../models/product')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/cart',{useNewUrlParser: true});
let products=[
    new product(
    {
        imagepath:"https://adn-static1.nykaa.com/nykdesignstudio-images/tr:w-824,/pub/media/catalog/product/v/r/vrku0008n_1.jpg",
        title:"flipkart",
        description:"special red kurta",
        price:18
    }),
    new product(
        {
            imagepath:"https://assets.ajio.com/medias/sys_master/root/h3d/h59/13300028112926/-473Wx593H-460314002-peach-MODEL.jpg",
            title:"pink dotting kurta",
            description:"special wholesale offer",
            price:20
        }),
   new product(
            {
                imagepath:"https://images-na.ssl-images-amazon.com/images/I/61BqajzRc5L._UY445_.jpg",
                title:"yellow dotting kurta",
                description:" wholesale offer",
                price:50
            }),    
    new product(
                {
                    imagepath:"https://storage.sg.content-cdn.io/cdn-cgi/image/width=1000,height=1500,quality=75,format=auto/in-resources/6c57599f-2c43-4c82-806a-e07c3410f5d3/Images/ProductImages/Source/skd5995ss19owh1.jpg",
                    title:"yellow  kurta",
                    description:"fixed wholesale offer",
                    price:10
                }), 
     new product(
                    {
                        imagepath:"https://rukminim1.flixcart.com/image/714/857/jkim1zk0/fabric/3/y/c/parita-adyah-enterprise-original-imaf4bynqz4mvanc.jpeg",
                        title:"flipkart",
                        description:"special red kurta",
                        price:18
                    }),
     new product(
                        {
                            imagepath:"https://rukminim1.flixcart.com/image/332/398/k3ahbww0/dress/c/g/4/l-gn2013-l-dev-fashion-original-imafgnnhm4zkqwcz.jpeg",
                            title:"simple,elegant dress",
                            description:"special wholesale offer",
                            price:20
                        }),
     new product(
                            {
                                imagepath:"https://rukminim1.flixcart.com/image/714/857/k5bcscw0pkrrdj/shoe/2/k/r/7-mw-319-red-spider-sports-mileswalker-original-imafehyf2gfpbuj4.jpeg",
                                title:"mileswalker running,gym shoes",
                                description:" wholesale offer",
                                price:50
                            }),    
    new product(
                                {
                                    imagepath:"https://rukminim1.flixcart.com/image/714/857/jwwffrk0/shoe/z/u/x/192874-4-puma-castlerock-white-original-imafhdshhhg7pebj.jpeg",
                                    title:"grey sports shoes",
                                    description:"fixed wholesale offer",
                                    price:10
                                }), 
]
var count=0;
for(var i=0;i<products.length;i++)
{
    products[i].save((err,result)=>{
        count++
        if(count===products.length){
          exit()
        }
    })
}
function exit()
{
    mongoose.disconnect()
}