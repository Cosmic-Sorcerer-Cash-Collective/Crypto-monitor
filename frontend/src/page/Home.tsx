import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card } from "../component/card/Card";

const instances = [
    { id: 1, title: 'Instance 1', description: 'Description 1', price: 10 },
    { id: 2, title: 'Instance 2', description: 'Description 2', price: 20 },
    { id: 3, title: 'Instance 3', description: 'Description 3', price: 30 },
    { id: 4, title: 'Instance 4', description: 'Description 4', price: 40 },
    { id: 5, title: 'Instance 5', description: 'Description 5', price: 50 },
    { id: 6, title: 'Instance 6', description: 'Description 6', price: 60 },
    { id: 7, title: 'Instance 7', description: 'Description 7', price: 70 },
    { id: 8, title: 'Instance 8', description: 'Description 8', price: 80 },
    { id: 9, title: 'Instance 9', description: 'Description 9', price: 90 },
    { id: 10, title: 'Instance 10', description: 'Description 10', price: 100 },
    { id: 11, title: 'Instance 11', description: 'Description 11', price: 110 },
    { id: 12, title: 'Instance 12', description: 'Description 12', price: 120 },
    { id: 13, title: 'Instance 13', description: 'Description 13', price: 130 },
    { id: 14, title: 'Instance 14', description: 'Description 14', price: 140 },
    { id: 15, title: 'Instance 15', description: 'Description 15', price: 150 },
    { id: 16, title: 'Instance 16', description: 'Description 16', price: 160 },
    { id: 17, title: 'Instance 17', description: 'Description 17', price: 170 },
    { id: 18, title: 'Instance 18', description: 'Description 18', price: 180 },
    { id: 19, title: 'Instance 19', description: 'Description 19', price: 190 },
    { id: 20, title: 'Instance 20', description: 'Description 20', price: 200 },
    { id: 21, title: 'Instance 21', description: 'Description 21', price: 210 },
    { id: 22, title: 'Instance 22', description: 'Description 22', price: 220 },
  ];

  export function Home() {
    return (
      <Box>
        <SimpleGrid columns={{ base: 2, md: 2, lg: 5 }} spacing={4}>
          {instances.map((instance) => (
            <Card
              key={instance.id}
              title={instance.title}
              description={instance.description}
              price={instance.price}
              onClick={() => console.log(`Clicked on ${instance.title}`)}
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  }