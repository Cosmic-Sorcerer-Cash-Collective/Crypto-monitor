interface IConfig {
    image: string;
    name: string;
}

export const createContainer = (config: IConfig)  => ({
    image: config.image,
    name: config.name,
    Tty: true,
    AttachStdout: true,
});