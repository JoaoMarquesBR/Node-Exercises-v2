import { Router } from "express";
import { baseFunction} from "./lab6.js"

const router = Router();
// define a default route
router.get("/", (req, res) => {
res
.status(200)
.send({ msg: `this would be a response from the default route` });
});
// define a get route with a name parameter
router.get("/:name", async (req, res) => {
    try {
        let name = req.params.name;
        let resultbasefunction = await baseFunction(name);
        console.log("\n\n");
        console.log(resultbasefunction);
        res.status(200).send({ msg: resultbasefunction });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



export default router;