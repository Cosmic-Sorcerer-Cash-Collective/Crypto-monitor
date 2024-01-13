import { useState } from 'react';
import { MainLayout } from '../components/layout';
import { VStack, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, useDisclosure, HStack, InputGroup, InputRightElement, Box, Text } from '@chakra-ui/react';
import { useMyContext } from '../context/MyContext';
import { Card } from '../components/card';
import { useNavigate } from 'react-router-dom';
import { createInstanceUrl } from '../utils';

interface createInstance {
  token: string;
  secret: string;
  name: string;
  description: string;
}

export function Home() {
  const { instances, setInstances } = useMyContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFormData = { token: '', secret: '', name: '', description: '' };
  const [formData, setFormData] = useState<createInstance>(initialFormData);
  const navigate = useNavigate();
  const { onOpen: onAlertOpen } = useDisclosure();

  const handleAddInstance = async (): Promise<void> => {
    const response = await fetch(createInstanceUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      console.error(response);
      return;
    }
    setInstances([...instances, {
      id: -1,
      name: formData.name,
      description: formData.description
    }]);
    setFormData(initialFormData);
    onClose();
    onAlertOpen();
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstances = instances.filter((instance) =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" size="lg">
          Instances
        </Heading>
        <HStack spacing={4} mb={4}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <Button onClick={() => setSearchTerm('')} variant="ghost" size="sm" colorScheme="white" mr={3}>
                Effacer
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={onOpen} colorScheme="blue" variant="outline">
            <Text size="sm" m={8}>Ajouter d'une instance</Text>
          </Button>
        </HStack>
        {filteredInstances.map((instance, index) => (
          <Box key={index}>
            <Card
              key={instance.id}
              title={instance.name}
              description={instance.description || "No description"}
              price={instance.price || 0}
              percentage={instance.percentage || 0}
              onClick={() => navigate(`/instance/${instance.id}`)}
            />
          </Box>
        ))}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ajouter une instance</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={4}>
                <FormControl id="token">
                  <FormLabel>Token</FormLabel>
                  <Input
                    type="text"
                    placeholder="Token"
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  />
                </FormControl>
                <FormControl id="secret">
                  <FormLabel>Secret</FormLabel>
                  <Input
                    type="text"
                    placeholder="Secret"
                    value={formData.secret}
                    onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                  />
                </FormControl>
                <FormControl id="name">
                  <FormLabel>Nom</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="blue" onClick={handleAddInstance}>
                Ajouter
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </MainLayout>
  );
}