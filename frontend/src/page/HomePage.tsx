import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout';
import SearchBar from '../components/SearchBar';
import { VStack, Box, Image, Text, Badge, Flex, Spacer } from '@chakra-ui/react';
import { FavoriteCrypto } from '../utils';

export function HomePage() {
  const navigate = useNavigate();
  // Remplacer ces données fictives par un appel à l'API backend
  const data = FavoriteCrypto;

  return (
    <MainLayout>
      <Box minW="80vw" maxW="100%" m="0 auto">
        <SearchBar placeholder="Rechercher une cryptomonnaie" onSearch={(term) => navigate(`/crypto?q=${term}`)} />
        <VStack mt={8} spacing={6} align="stretch" maxH="calc(80vh - 100px)" overflowY="auto" className="scroll-container" p={2} border="1px solid #e2e8f0" borderRadius="md" boxShadow="md">
          {data.map((crypto) => (
            <Box
              key={crypto.id}
              p={4}
              borderRadius="md"
              borderWidth="1px"
              _hover={{ cursor: 'pointer', bg: 'gray.100' }}
              onClick={() => navigate(`/crypto/${crypto.id}`)}
            >
              <Flex align="center">
                <Image src={crypto.icon} alt={crypto.name} boxSize="50px" />
                <Text fontWeight="bold" ml={4}>{crypto.name}</Text>
                <Badge colorScheme="green" ml={2}>{crypto.symbol}</Badge>
                <Spacer />
                <Text>${crypto.price.toLocaleString()}</Text>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </MainLayout>
  );
}
