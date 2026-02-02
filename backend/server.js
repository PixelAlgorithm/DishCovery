import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app=express();
const PORT=5000;
const MONGODB_URI='mongodb://localhost:27017/dishcovery';
const JWT_SECRET='dishcovery_secret_key_2025';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('MongoDB Error:',err));

const userSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
createdAt:{type:Date,default:Date.now}
});

const recipeSchema=new mongoose.Schema({
name:{type:String,required:true},
ingredients:{type:[String],required:true},
instructions:{type:String,required:true},
cookingTime:{type:String,required:true},
category:{type:String,required:true}
});

const User=mongoose.model('User',userSchema);
const Recipe=mongoose.model('Recipe',recipeSchema);

app.post('/api/register',async(req,res)=>{
try{
const {name,email,password}=req.body;
const existingUser=await User.findOne({email});
if(existingUser){
return res.status(400).json({message:'User already exists'});
}
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new User({name,email,password:hashedPassword});
await newUser.save();
res.status(201).json({message:'Registration successful'});
}catch(error){
res.status(500).json({message:'Registration failed',error:error.message});
}
});

app.post('/api/login',async(req,res)=>{
try{
const {email,password}=req.body;
const user=await User.findOne({email});
if(!user){
return res.status(400).json({message:'Invalid credentials'});
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
return res.status(400).json({message:'Invalid credentials'});
}
const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'24h'});
res.json({message:'Login successful',token,name:user.name});
}catch(error){
res.status(500).json({message:'Login failed',error:error.message});
}
});

app.get('/api/recipes',async(req,res)=>{
try{
let recipes=await Recipe.find();
if(recipes.length===0){
const indianRecipes=[
{
name:'Butter Chicken',
ingredients:['500g chicken','2 cups tomato puree','1 cup cream','2 tbsp butter','1 tsp garam masala','1 tsp red chili powder','Salt to taste','2 tbsp ginger-garlic paste'],
instructions:'Marinate chicken with spices. Cook chicken in butter. Add tomato puree and spices. Simmer for 20 minutes. Add cream and cook for 5 more minutes. Serve hot with naan or rice.',
cookingTime:'45 minutes',
category:'Main Course'
},
{
name:'Masala Dosa',
ingredients:['2 cups dosa batter','3 potatoes','1 onion','2 green chilies','1 tsp mustard seeds','Curry leaves','Turmeric powder','Salt to taste'],
instructions:'Boil and mash potatoes. Prepare masala with onions, spices and potatoes. Spread dosa batter on hot tawa. Add masala filling. Fold and serve with chutney and sambar.',
cookingTime:'30 minutes',
category:'Breakfast'
},
{
name:'Biryani',
ingredients:['2 cups basmati rice','500g chicken/mutton','2 onions','1 cup yogurt','2 tbsp biryani masala','Saffron','Ghee','Mint and coriander leaves'],
instructions:'Marinate meat with yogurt and spices. Cook rice 70%. Layer rice and meat. Add saffron milk and ghee. Cover and cook on low heat for 30 minutes. Serve with raita.',
cookingTime:'90 minutes',
category:'Main Course'
},
{
name:'Paneer Tikka',
ingredients:['250g paneer cubes','1 cup yogurt','2 tbsp tikka masala','1 capsicum','1 onion','Lemon juice','Salt','Oil for grilling'],
instructions:'Marinate paneer and vegetables with yogurt and spices for 2 hours. Skewer the marinated pieces. Grill or bake at 200C for 15-20 minutes. Serve hot with mint chutney.',
cookingTime:'40 minutes',
category:'Appetizer'
},
{
name:'Gulab Jamun',
ingredients:['1 cup milk powder','2 tbsp all-purpose flour','2 tbsp ghee','Milk as needed','2 cups sugar','2 cups water','Cardamom powder','Rose water'],
instructions:'Mix milk powder, flour and ghee. Add milk to form soft dough. Make small balls. Deep fry on low heat until golden. Prepare sugar syrup with cardamom. Soak fried balls in warm syrup for 2 hours.',
cookingTime:'60 minutes',
category:'Dessert'
}
];
await Recipe.insertMany(indianRecipes);
recipes=await Recipe.find();
}
res.json(recipes);
}catch(error){
res.status(500).json({message:'Failed to fetch recipes',error:error.message});
}
});

app.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`);
});
