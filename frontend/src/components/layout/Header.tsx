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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemClick = () => (
    <>
      <Box onClick={() => navigate('/')} width="100%">
        <MenuItem>Home</MenuItem>
      </Box>
      <Box onClick={() => navigate('/bot')} width="100%">
        <MenuItem>Bot</MenuItem>
      </Box>
      <Box onClick={() => navigate('/Crypto')} width="100%">
        <MenuItem>Crypto</MenuItem>
      </Box>
      <Box onClick={() => navigate('/contact')} width="100%">
        <MenuItem>Contact</MenuItem>
      </Box>
    </>
  );

  const renderMobileMenu = () => (
    <Flex direction="column" alignItems="center" height="100%" m="0 auto">
      {itemClick()}
    </Flex>
  );

  const renderDesktopMenu = () => (
    <Flex as="nav" align="center">
      {itemClick()}
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
        <Text fontSize="2xl" fontWeight="bold" onClick={() => navigate('/')} as="nav">
          CryptoMonitor
        </Text>
        {isMobileView ? (
          <>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Ouvrir le menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              colorScheme='white'
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bgGradient="linear(to-r, teal.500, teal.300)">
                <DrawerCloseButton />
                <DrawerHeader fontSize="2xl" fontWeight="bold" color='white' >Menu</DrawerHeader>
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
