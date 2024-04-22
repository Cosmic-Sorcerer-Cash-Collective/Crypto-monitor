import express from 'express'
import Docker from 'dockerode'
import { createContainer } from './configInstance'

const routesDockerInstance = express.Router()
const docker = new Docker()

routesDockerInstance.post('/create-container', (req: express.Request, res: express.Response) => {
  const { name } = req.body
  if (name === undefined) { res.status(400).json({ success: false, message: 'Le nom du conteneur est requis.' }) } else {
    try {
      docker.createContainer(createContainer({
        image: 'node:20-alpine3.17',
        name
      })).then(async (container) =>
        await container.start().then(() =>
          res.status(200).json({ success: true, message: 'Conteneur créé avec succès.' })
        ).catch((error) => { console.error('Erreur lors du démarrage du conteneur :', error) })
      ).catch((error) => { console.error('Erreur lors de la création du conteneur :', error) })
    } catch (error) {
      console.error('Erreur lors de la création du conteneur :', error)
      res.status(500).json({ success: false, message: 'Erreur lors de la création du conteneur.' })
    }
  }
})

interface listContainerProps {
  id: string
  name: string
}

routesDockerInstance.get('/list-containers', (req: express.Request, res: express.Response) => {
  try {
    docker.listContainers().then((containers) => {
      const containersList: listContainerProps[] = containers.map((container) => ({
        id: container.Id,
        name: container.Names[0]
      }))
      res.status(200).json({ success: true, containersList })
    }).catch((error) => { console.error('Erreur lors de la liste des conteneurs :', error) })
  } catch (error) {
    console.error('Erreur lors de la liste des conteneurs :', error)
    res.status(500).json({ success: false, message: 'Erreur lors de la liste des conteneurs.' })
  }
})

routesDockerInstance.get('/remove-container/:containerId', (req: express.Request, res: express.Response) => {
  try {
    const containerId = req.params.containerId
    const container = docker.getContainer(containerId)
    container.stop().catch((error) => { console.error('Erreur lors de l\'arrêt du conteneur :', error) })
    container.remove().catch((error) => { console.error('Erreur lors de la suppression du conteneur :', error) })
    res.status(200).json({ success: true, message: 'Conteneur supprimé avec succès.' })
  } catch (error) {
    console.error('Erreur lors de la suppression du conteneur :', error)
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du conteneur.' })
  }
})

export default routesDockerInstance
