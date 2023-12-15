export const getInstancesUrl = () => `${import.meta.env.VITE_API_URL}/list-containers`;

export const createInstanceUrl = () => `${import.meta.env.VITE_API_URL}/create-container`;

export const deleteInstanceUrl = (id: string) => `${import.meta.env.VITE_API_URL}/remove-container/${id}`;