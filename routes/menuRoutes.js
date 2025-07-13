const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/menu');

router.post('/',async(req,res)=>{
    try{
       const data=req.body;
       const newMenu=new MenuItem(data);
       const response=await newMenu.save(); 
       console.log('Data saved');
      res.status(201).json(response);
    }catch(err){
      console.error('Error creating menu item:', err);  
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/',async(req,res)=>{
    try{
      const menuItems=await MenuItem.find();
      console.log('data fetched');
      res.status(201).json(menuItems);
    }catch(err){
        console.error('Error creating menu item:', +err);
       res.status(500).json({ error: 'Internal server error' });
    }
});

// Parameterized API
router.get('/:taste',async(req,res)=>{
  try{
    const tasteType=req.params.taste;
   if(tasteType=='Sour'||tasteType=='Sweet'||tasteType=='Spicy'){
    const response=await MenuItem.find({taste:tasteType});
    console.log('data fetched'); 
    res.status(201).json(response);
   }
  }catch(err){
    console.error('Error creating menu item:', +err);
       res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id',async(req,res)=>{
  try{
    const menuId=req.params.id;
  const updatedMenuData=req.body;
  const updateMenu=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
    new: true, // Return the updated document
       runValidators: true, // Run Mongoose validation
  });
  if(!updateMenu){
    return res.status(404).json({ error: 'Person not found'});
  }
  console.log('data uploaded');
  res.status(200).json(updateMenu);
  }catch(error){
    console.error('Error updating person:', error);
 res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const menuId=req.params.id;
    const deletedMenuItem=await MenuItem.findByIdAndDelete(menuId);
    if(!deletedMenuItem)
      return res.status(404).json({error: 'Menu Item record not found.'});
    res.json({ message: 'Person deleted successfully' });
  }catch(error){
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Comment added FOR TESTING PURPOSE
module.exports=router;