import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <Box minW={320} maxW="100%" mx="auto">
        <Header />
        <Flex as="main" direction="column" align="center" mt={8}>
            {children}
        </Flex>
    </Box>
  );
}
