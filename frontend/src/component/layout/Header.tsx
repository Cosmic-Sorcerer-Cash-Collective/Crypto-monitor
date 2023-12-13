import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ children } : { children: React.ReactNode }) => (
  <Box
    px={4}
    py={2}
    fontSize="lg"
    color="white"
    _hover={{ bg: 'teal.600', color: 'white' }}
    transition="background 0.3s, color 0.3s"
    cursor="pointer"
  >
    {children}
  </Box>
);

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMobileMenu = () => (
    <Flex direction="column" alignItems="center" height="100vh" m="0 auto">
      <MenuItem>Page d'accueil</MenuItem>
      <MenuItem>À propos</MenuItem>
      <MenuItem>Services</MenuItem>
      <MenuItem>Contact</MenuItem>
    </Flex>
  );

  const renderDesktopMenu = () => (
    <Flex as="nav" align="center">
      <MenuItem>Page d'accueil</MenuItem>
      <MenuItem>À propos</MenuItem>
      <MenuItem>Services</MenuItem>
      <MenuItem>Contact</MenuItem>
    </Flex>
  );

  return (
    <Box
      borderBottom="1px"
      borderColor="gray.200"
      bgGradient="linear(to-r, teal.500, teal.300)"
      color="white"
      boxShadow="md"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        py={4}
        align="center"
        justify="space-between"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Crypto Monitor
        </Text>
        {isMobileView ? (
          <>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Ouvrir le menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bgGradient="linear(to-r, teal.500, teal.300)">
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>{renderMobileMenu()}</DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          renderDesktopMenu()
        )}
      </Flex>
    </Box>
  );
}
