import express from 'express'
import { addApp, deleteAppById, getApps } from '../Controller/app.js';

const router = express.Router()

router.get("/all", async (req, res) => {
  try {
    const availableApps = await getApps(req);
    console.log(availableApps);
    if (!availableApps) {
      return res.status(400).json({ message: "no data availabe" });
    }
    res.status(200).json({ data: availableApps });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});


router.post("/add-app", async (req, res) => {
  try {
    const newApp = req.body;
    console.log(newApp);
    if (!newApp) {
      return res.status(400).json({ message: "no data availabe" });
    }
    const result = await addApp(newApp);
    if (!result.acknowledged) {
      return res.status(400).json({ message: "error occured" });
    }
    res.status(200).json({ data: newApp, status: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error occured" });
  }
});


router.post("/launch", async (req, res) => {
    try {
        const { link } = req.body
         if (!link) {
           return res.status(400).send("Application path is required");
         }
        res.json({ url: link });
        console.log(link)
         exec(link, (error, stdout, stderr) => {
           if (error) {
             console.error(`Error launching application: ${error.message}`);
             return res.status(500).send("Error launching application");
           }
           if (stderr) {
             console.error(`Error launching application: ${stderr}`);
             return res.status(500).send("Error launching application");
           }
           console.log(`Application launched successfully: ${stdout}`);
           res.send("Application launched successfully");
         });
    } catch (error) {
        
    }
})


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteApp = req.body;
    if (!id || !deleteApp) {
      return res.status(400).json({ message: "Wrong request" });
    }
    const result = await deleteAppById(id, deleteApp);
    if (!result.deletedCount <= 0) {
      return res.status(400).json({ message: "error occured" });
    }
    return res.status(201).json({ data: deleteApp, status: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});
export const AppRouter = router;