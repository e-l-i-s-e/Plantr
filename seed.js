// const { Vegetable, Plot, Gardener} = require('./models')
const { db, Vegetable, Plot, Gardener } = require('./models')


db.sync({force: true})
.then(() =>{
    return   Vegetable.bulkCreate([
      {name: 'carrot', color: 'orange', planted_on: '2018-01-01'},
      {name: 'peas', color: 'green', planted_on: '2018-01-02'},
      {name: 'parsnip', color: 'white', planted_on: '2018-01-03'},
    ]);
})
.then((arrayOfVegetables) => { // Notice: There are no arguments here, as of right now you'll have to...
    return Gardener.bulkCreate([
      {name: 'Jacob', age: 72, favorite_vegetable: arrayOfVegetables[1].id },
      {name: 'Janet', age: 55, favorite_vegetable: arrayOfVegetables[0].id},
      {name: 'Summer', age: 26, favorite_vegetable: arrayOfVegetables[2].id},
  ])
})
.then((arrOfGardeners) => { // Notice: There are no arguments here, as of right now you'll have to...
    return Plot.bulkCreate([
      {size: 20, shaded: true, },
      {size: 10, shaded: false},
      {size: 15, shaded: false},
    ]);
})
.catch(err => console.log(err))

module.exports = {

}
