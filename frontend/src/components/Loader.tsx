import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export function Loader() {
    return (
      <Box>
        <Flex align="center" justify="center" direction="column" minH="100vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
          <Text mt={4} fontSize="lg" fontWeight="bold" color="teal.500">
            Chargement en cours...
          </Text>
        </Flex>
      </Box>
    );
}