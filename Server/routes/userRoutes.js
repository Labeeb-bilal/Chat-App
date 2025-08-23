const {Router} = require('express');
const router = Router();
const {CheckAuth} = require('../middleware/Auth')
const {handleUserSignin,handleUserSignup,handleCheckAuth, handleUpdateProfile} = require('../Controllers/UserController')
const multer = require('multer');

const storage = multer.diskStorage({
    destination : "public/uploads",
    filename : (req,file,cb) => {
       cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.post('/register', handleUserSignup);
router.post('/login', handleUserSignin);
router.get('/checkAuth', CheckAuth, handleCheckAuth);
router.put('/update/:id', CheckAuth, upload.single('profilePic'), handleUpdateProfile);




module.exports = router;   