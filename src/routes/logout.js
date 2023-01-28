import express from 'express'
const router = express.Router()


router.get('/', async (req, res) => {
        req.session.destroy((err) => {
                res.redirect("/bye") 
              })
})

export default { router };