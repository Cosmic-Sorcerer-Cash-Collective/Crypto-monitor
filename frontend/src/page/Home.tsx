import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card } from "../component/card/Card";

const instances = [
    { id: 1, title: 'Instance 1', description: 'Description 1', price: 10, percentage: -0.1 },
    { id: 2, title: 'Instance 2', description: 'Description 2', price: 20, percentage: -20 },
    { id: 3, title: 'Instance 3', description: 'Description 3', price: 30, percentage: 10 },
    { id: 4, title: 'Instance 4', description: 'Description 4', price: 40, percentage: 0.1 },
    { id: 5, title: 'Instance 5', description: 'Description 5', price: 50, percentage: 650 },
    { id: 6, title: 'Instance 6', description: 'Description 6', price: 60, percentage: 60 },
    { id: 7, title: 'Instance 7', description: 'Description 7', price: 70, percentage: -22.3 },
    { id: 8, title: 'Instance 8', description: 'Description 8', price: 80, percentage: 80 },
    { id: 9, title: 'Instance 9', description: 'Description 9', price: 90, percentage: -12 },
    { id: 10, title: 'Instance 10', description: 'Description 10', price: 100, percentage: 123 },
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
              percentage={instance.percentage}
              onClick={() => console.log(`Clicked on ${instance.title}`)}
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  }