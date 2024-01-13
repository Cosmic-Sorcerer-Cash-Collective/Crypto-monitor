import React from 'react';
import { MainLayout } from '../components/layout';
import { Heading, VStack, Text } from '@chakra-ui/react';

export const Contact: React.FC = () => {
  return (
    <MainLayout>
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" size="lg">
          Contactez-nous
        </Heading>
        <VStack align="stretch" spacing={4}>
          <Text>Email : erwan-baillon@orange.fr</Text>
          <Text>Téléphone : +33 674085838</Text>
        </VStack>
      </VStack>
    </MainLayout>
  );
};