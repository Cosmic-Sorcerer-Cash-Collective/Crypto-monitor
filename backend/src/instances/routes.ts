import express from "express";
import Docker from "dockerode";
import { createContainer } from "./configInstance";

const router = express.Router();
const docker = new Docker();

router.get('/create-container', async (req: express.Request, res: express.Response) => {
    try {
      const container = await docker.createContainer(createContainer({
        image: 'node:20-alpine3.17',
        name: 'node-container',
        }));
      await container.start();
      res.status(200).json({ success: true, message: 'Conteneur créé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la création du conteneur :', error);
      res.status(500).json({ success: false, message: 'Erreur lors de la création du conteneur.' });
    }
  });

router.get('/list-containers', async (req: express.Request, res: express.Response) => {
    try {
      const containers = await docker.listContainers();
      res.status(200).json({ success: true, containers });
    } catch (error) {
      console.error('Erreur lors de la liste des conteneurs :', error);
      res.status(500).json({ success: false, message: 'Erreur lors de la liste des conteneurs.' });
    }
  });

router.get('/remove-container/:containerId', async (req: express.Request, res: express.Response) => {
    try {
      const containerId = req.params.containerId;
      const container = docker.getContainer(containerId);
      await container.stop();
      await container.remove();
      res.status(200).json({ success: true, message: 'Conteneur supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression du conteneur :', error);
      res.status(500).json({ success: false, message: 'Erreur lors de la suppression du conteneur.' });
    }
  });

module.exports = router;