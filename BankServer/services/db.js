const mongoose= require('mongoose');

mongoose.connect('mongodb://dhat:lama123@ac-vif4dub-shard-00-00.jc9fbzk.mongodb.net:27017,ac-vif4dub-shard-00-01.jc9fbzk.mongodb.net:27017,ac-vif4dub-shard-00-02.jc9fbzk.mongodb.net:27017/?ssl=true&replicaSet=atlas-d0uojd-shard-0&authSource=admin&retryWrites=true&w=majority',

{
    useNewUrlParser: true  //to avoid unwanted warnings
}, (err) => {
    if (err) {
        console.log("Error connecting to database: ", err);
    } else {
        console.log("Successfully connected to database");
    }
}
);
mongoose.set('strictQuery', true);


//Define bank db model

const User=mongoose.model('User',
{
    acno:Number,
    username:String,
    pswd:String,
    balance:Number,
    transaction:Array
});

//export collection

module.exports={
    User
}