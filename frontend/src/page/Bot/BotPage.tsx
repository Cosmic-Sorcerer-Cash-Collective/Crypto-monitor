import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { MainLayout } from "../../components/layout";
import SearchBar from "../../components/SearchBar";

export function BotPage() {
  return (
    <MainLayout>
      <Box minW="80vw" maxW="100%" m="0 auto" height="100%" minH="calc(90vh - 100px)" border="1px solid #e2e8f0" borderRadius="md" boxShadow="md" p={4}>
      <Grid templateAreas={`"filter searchBar"
                            "filter content"`}
                            gap={1}
                            gridTemplateColumns={"250px 1fr"}
                            gridTemplateRows={"auto 1fr"}
                           height="100%">
        <GridItem gridArea="searchBar">
          <SearchBar placeholder="Rechercher un bot" onSearch={(term) => console.log(term)} />
        </GridItem>
        <GridItem gridArea="filter">
          <Heading>Bot</Heading>
        </GridItem>
        <GridItem gridArea="content">
          <Heading>Contenu</Heading>
        </GridItem>
      </Grid>
      </Box>
    </MainLayout>
  );
}