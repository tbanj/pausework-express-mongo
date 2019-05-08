const express = require('express');
const jwt = require('jsonwebtoken');
const LeaveModel = require('../models/LeaveModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateLeaveValidator } = require('../validators/LeaveValidator');
const router = express.Router();
const adminKey = 'LevelUp'
// Create an leave
router.post(
  '/',
  AuthMiddleware,
  JoiValidator(CreateLeaveValidator),
  async function(req, res) {
    try {
      const leave = await LeaveModel.create({
        // leavetype: req.body.leavetype,
        // startdate: req.body.startdate,
        // enddate: req.body.enddate,
        // offdays: req.body.offdays,
        // leavemessage: req.body.leavemessage,
        // approvestatus: req.body.approvestatus,
        // approvemessage: req.body.approvemessage,
        
        // using spread operator 
        ...req.body,
        createddate: new Date(),
        employee: req.user,
        
      });
      console.log(req.body.approvemessage);
      
      res.json({ status: 'success', data: leave });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: '🤦🏾 an error occured while creating your leave',
      });
      console.error(err);
    }
  }
);

router.put('/:id/public', AuthMiddleware, async (req, res) => {
  try {
    const leave = await LeaveModel.findByIdAndUpdate(
      {
        _id: req.params.id,
        employee: req.user,
      },
      { is_public: true },
      { new: true }
    );

    res.json({ status: 'success', data: leave });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occured while setting leave to public',
    });
  }
});

/**
 * Returns a list of public leaves
 */
router.get('/feed', async function(req, res) {
  try {
    const publicLeaves = await LeaveModel.find({ is_public: true });
    res.json({ status: 'success', data: publicLeaves });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occured' });
  }
});

// router.get('/:id', async function(req, res) {
//   try {
//     const leave = await LeaveModel.findById(req.params.id);
//     res.json({ status: 'success', data: leave });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: 'error', message: 'Could not find leave' });
//   }
// });

// Get all employee leaves
// router.get('/user', AuthMiddleware, async function(req, res) {
//   try {
//     const leaves = await LeaveModel.find({ employee: req.user });

//     res.json({ status: 'success', data: leaves });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: 'error', message: 'Could not find leaves!' });
//   }
// });



// Get all leaves for a particular use & query based on its fields
router.get('/user', AuthMiddleware,async function(req, res) {
  // console.log(req.user);
  // console.log(req.isadmin);
  
  // console.log(req.query);
  
  
  
  try {
    // to implement query
    // searchArray = [];
    
    
    // console.log(req.user);
    // console.log(req.query);
    
    // if( Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    //   console.log('its null');
     
    // } else {
    //   console.log('its not null');
    
    // }

    var searchAdd ={};
    if( Object.keys(req.query).length === 1 && req.query.constructor === Object) {
      
    
    }
   
      else if(Object.keys(req.query).length > 1 && req.query.constructor === Object) {
        
        switch (true) {
          

          case Object.keys(req.query)[1].toString() === "offdays" :
              const offDays = req.query.leavetype ? { offdays: req.query.offdays } : {};
              searchAdd["offdays"] = req.query["offdays"];
              break;

          case Object.keys(req.query)[1].toString() === "leavetype" :
            const leaveType = req.query.leavetype ? { leavetype: req.query.leavetype } : {};
            searchAdd["leavetype"] = leaveType["leavetype"];
            break;

          case Object.keys(req.query)[1].toString() === "approvestatus" :
            const approvestatus = req.query.approvestatus ? { approvestatus: req.query.approvestatus } : {};
            searchAdd["approvestatus"] = approvestatus['approvestatus'];
            break;
      
          default:
            console.log('params not acceptable');
            console.log(searchAdd);
            break;
        }

        
      
      } else {

      }

      console.log(Object.values(searchAdd));
      
    const leaves = await LeaveModel.find(searchAdd);
    res.json({
      status: 'succcess',
      data: leaves,
    });
    console.log(res.j);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting leaves's",
    });
  }
});


router.get('', AuthMiddleware,async function(req, res) {
  console.log(req.user);
  console.log(req.isadmin);
  try {
    if (req.query.isAdmin) {
      if (req.query.isAdmin !== adminKey) {
        res.status(404).json({status: 'error', message: 'you are not an admin'})
        return;
      }

      var search= {}
      if( Object.keys(req.query).length ===1 && req.query.constructor === Object) {
        const leaves = await LeaveModel.find({});
        res.status(200).json({status: 'success', data: leaves});
        
      console.log(typeof Object.keys(req.query).length);
      console.log(req.query.constructor);
        console.log('its not null'); return;}
  
        else if(Object.keys(req.query).length >1 && req.query.constructor === Object) {
          searchAdd ={};
          console.log('iiiiiiiiiiiiiiiiiii');
          console.log(req.query);
          switch (true) {
      
      
            case Object.keys(req.query)[1].toString() === "approvestatus" :
              const approvestatus = req.query.approvestatus ? { approvestatus: req.query.approvestatus } : {};
              searchAdd["approvestatus"] = approvestatus['approvestatus'];
              break;

            case Object.keys(req.query)[1].toString() === "leavetype" :
              const leaveType = req.query.leavetype ? { leavetype: req.query.leavetype } : {};
              searchAdd["leavetype"] = leaveType['leavetype'];
              break;


            case Object.keys(req.query)[1].toString() === "approvedby" :
              const approvedBy = req.query.approvedby ? { approvestatus: req.query.approvedby } : {};
              searchAdd["approvedby"] = approvedBy['approvedby'];
              break;


            case Object.keys(req.query)[1].toString() === "offdays" :
              const offdays = req.query.offdays ? { offdays: req.query.offdays } : {};
              searchAdd["offdays"] = approvestatus['offdays'];
              break;
            
            
            
      
            case  Object.keys(req.query.leavetype) !== "undefined" && Object.keys(req.query.approvestatus) !== "undefined":
              const searchleavetypeJoin = req.query.leavetype ? { leavetype: req.query.leavetype } : {};
              searchAdd["leavetype"] = searchleavetypeJoin["leavetype"];
              const searchapprovestatusJoin = req.query.approvestatus ? { approvestatus: req.query.approvestatus } : {};
              searchAdd["approvestatus"] = searchapprovestatusJoin["approvestatus"];
              console.log(searchAdd);
              break;
      
              
            default:
              console.log('params not acceptable');
              console.log(searchAdd);
              
          }
          console.log(typeof searchAdd);
          console.log(searchAdd);
          const leaves = await LeaveModel.find(searchAdd);
          console.log(leaves);
          
          res.status(200).json({status: 'success', data: leaves})
          return;
        }
       
          
       else {
        console.log('its null');

        return;
         
      }
      


    } else {
      res.status(403).json({status:'error', message: 'provide admin key'})
    }
    
   
    
    
    

   
    
    
    
      
      
 
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting leaves's",
    });
  }
});
module.exports = router;
