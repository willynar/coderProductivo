export const sessionDestroy = async (req, res) => {
    try {
        req.session.destroy((err) => {
            res.redirect("/bye") 
          })
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}