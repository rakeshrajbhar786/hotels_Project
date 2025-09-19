const express=require('express');
const router=express.Router();
const Person=require('./../models/person'); 
// POST route to add a person
router.post('/', async (req, res) => {
   try {
      const data = req.body; // Assuming req body contains person data

      // Create a new Person document using mongoose model
      const newPerson = new Person(data);

      // Save the new Person to database
      const response = await newPerson.save();
      console.log('Data saved');
      res.status(201).json(response);
   } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
      console.log(err)
   }
});

// GET method to get person
router.get('/',async(req,res)=>{
    try{
      const data= await Person.find();
      console.log('data fetched');
      res.status(201).json(data);
    }catch(err){
      
    }
});

// Parameterized API call to server
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='Chef'||workType=='Manager'||workType=='Waiter'){
      const response=await Person.find({work:workType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'Invalid work type'});
    }
  }catch{
   console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
 try {
 const personId = req.params.id; // Extract the person's ID from the URL parameter
 const updatedPersonData = req.body; // Updated data for the  person
 // Assuming you have a Person model
 const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
       new: true, // Return the updated document
       runValidators: true, // Run Mongoose validation
     });
  if (!updatedPerson) {
 return res.status(404).json({ error: 'Person not found'});
 }
 // Send the updated person data as a JSON response
   console.log('data uploaded');
  res.status(200).json(updatedPerson);
 } catch (error) {
 console.error('Error updating person:', error);
 res.status(500).json({ error: 'Internal server error' });
 }
 });

 router.delete('/:id',async(req,res)=>{
    try{
      const personId=req.params.id;
      const deletedPerson= await Person.findByIdAndDelete(personId);
      if (!deletedPerson) {
     return res.status(404).json({ error: 'Person not found' });
     }
     // Send a success message as a JSON response
       res.json({ message: 'Person deleted successfully' });
      } catch (error) {
          console.error('Error deleting person:', error);
             res.status(500).json({ error: 'Internal server error' });
        }
 });

// Comments are added for testing Purpose 
module.exports=router;