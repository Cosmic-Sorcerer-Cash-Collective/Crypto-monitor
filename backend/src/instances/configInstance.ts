interface IConfig {
  image: string
  name: string
}

interface IContainer {
  image: string
  name: string
  Tty: boolean
  AttachStdout: boolean
}

export const createContainer = (config: IConfig): IContainer => ({
  image: config.image,
  name: config.name,
  Tty: true,
  AttachStdout: true
})
