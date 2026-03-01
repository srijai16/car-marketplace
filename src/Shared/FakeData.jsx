import { faker } from "@faker-js/faker"
function createRandomCarList(){
    return{
        name:faker.vehicle.vehicle(),
        fuel:faker.vehicle.fuel(),
        model:faker.vehicle.model(),
        type:faker.vehicle.type(),
        image:'https://img.autocarindia.com/mmv_images/colors/20250825041551_BMW_7_Series_Carbon_Black_Metallic.jpg?w=640&q=75',
        miles:1000,
        gearType:'Automatic',
        price:faker.finance.amount({min:4000,max:20000})
    };

}
const carList=faker.helpers.multiple(createRandomCarList,{
    count:7
})

export default{
    carList
}