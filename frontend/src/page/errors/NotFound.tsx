import { Button, Flex, Heading } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/36395-lonely-404.json";
import { MainLayout } from "../../components/layout";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <MainLayout>
    <Flex direction="column" gap={8}>
      <Lottie animationData={animationData} loop={true} className="not-found" />
      <Heading as="h1" size="md" textAlign="center">
        La page n'existe pas
      </Heading>
      <Button
        size="lg"
        colorScheme="twitter"
        variant="ghost"
        onClick={() => navigate("/")}
      >
        Retourner au Home
      </Button>
    </Flex>
    </MainLayout>
  );
}
