
const {Router} = require('express');
const router = Router();
const {getUsersForSideBar, getAllMessagesOfUser, markMessageAsTrue, createMessage} = require('../Controllers/messageController');
const { CheckAuth } = require('../middleware/Auth');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : "public/uploads",
    filename : (req,file,cb) => {
       cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.get('/users', CheckAuth, getUsersForSideBar);
router.get('/:id', CheckAuth, getAllMessagesOfUser);
router.put('/update/:id',markMessageAsTrue);
router.post('/send/:id',CheckAuth, upload.single('image'), createMessage);






module.exports = router;