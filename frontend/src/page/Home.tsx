import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card } from "../component/card/Card";
import { useMyContext } from "../context/MyContext";
import { Loader } from "../component";

  export function Home() {
    const { instances, load } = useMyContext();
    console.log(instances, load);
    return (
      <Box>
        {(!load && instances.length != 0) ? (
          <Loader />
        ) : (
          <SimpleGrid columns={{ base: 2, md: 2, lg: 5 }} spacing={4}>
            {instances.map((instance) => (
              <Card
                key={instance.id}
                title={instance.name}
                description={instance.description || "No description"}
                price={instance.price || 0}
                percentage={instance.percentage || 0}
                onClick={() => console.log(`Clicked on ${instance.name}`)}
              />
            ))}
          </SimpleGrid>
        )}
        {/* <SimpleGrid columns={{ base: 2, md: 2, lg: 5 }} spacing={4}>
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
        </SimpleGrid> */}
      </Box>
    );
  }