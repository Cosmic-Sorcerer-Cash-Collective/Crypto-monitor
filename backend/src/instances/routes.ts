import express from "express";
import Docker from "dockerode";
import { createContainer } from "./configInstance";

const router = express.Router();
const docker = new Docker();

router.post('/create-container', async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Le nom du conteneur est requis.' });
  }
    try {
      const container = await docker.createContainer(createContainer({
        image: 'node:20-alpine3.17',
        name: name,
        }));
      await container.start();
      res.status(200).json({ success: true, message: 'Conteneur créé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la création du conteneur :', error);
      res.status(500).json({ success: false, message: 'Erreur lors de la création du conteneur.' });
    }
  });

interface listContainerProps {
    id: string;
    name: string;
}

router.get('/list-containers', async (req: express.Request, res: express.Response) => {
    try {
      const containers = await docker.listContainers();
      const containersList : listContainerProps[] = containers.map((container) => ({
        id: container.Id,
        name: container.Names[0],
      }));
      res.status(200).json({ success: true, containersList });
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