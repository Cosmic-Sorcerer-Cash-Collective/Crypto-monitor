// ContactPage.tsx
import { MainLayout } from '../../components/layout';
import { Heading, VStack, Flex, Box, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import { ContactForm, ValidationSchemaContactForm } from './ContactForm';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export function ContactPage() {
  const onSubmit = (data: ValidationSchemaContactForm) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <VStack spacing={8} align="center" py={12} px={4}>
        <Heading as="h2" size="xl" textAlign="center">
          Contactez-nous
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box p={6} borderRadius="lg" boxShadow="lg" bg="white">
            <Heading as="h3" size="lg" mb={4}>
              Formulaire de Contact
            </Heading>
            <ContactForm onSubmit={onSubmit} />
          </Box>
          <Box p={6} borderRadius="lg" boxShadow="lg" bg="white">
            <Heading as="h3" size="lg" mb={4}>
              Informations Utiles
            </Heading>
            <VStack align="flex-start" spacing={4}>
              <InfoItem icon={<Icon as={FaMapMarkerAlt} />} label="Adresse" value="123 Rue de la République, 75001 Paris, France" />
              <InfoItem icon={<Icon as={FaPhoneAlt} />} label="Téléphone" value="+33 1 23 45 67 89" />
              <InfoItem icon={<Icon as={FaEnvelope} />} label="Email" value="contact@example.com" />
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </MainLayout>
  );
}

interface InfoItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <Flex align="center">
    <Box mr={3} color="blue.500" fontSize="xl">
      {icon}
    </Box>
    <VStack align="flex-start" spacing={0}>
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </VStack>
  </Flex>
);
