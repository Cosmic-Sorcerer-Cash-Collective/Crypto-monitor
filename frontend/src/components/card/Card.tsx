import { Box, Flex, Stat, StatArrow, StatHelpText } from "@chakra-ui/react";

interface CardProps {
    title: string;
    description: string;
    price: number;
    percentage: number;
    onClick: () => void;
}

export function Card({ title, description, price, percentage, onClick }: CardProps) {
    return (
        <Box onClick={onClick} borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
            <Box p="6">
                <Box alignItems="baseline">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {title}
                    </Box>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {description}
                </Box>

                <Flex mt="2" alignItems="center" justifyContent="space-between" flexDirection="row" >
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {price} €
                    </Box>
                    <Stat textAlign="right">
                        <StatHelpText>
                            <StatArrow type={percentage > 0 ? "increase" : "decrease"} />
                            {percentage}%
                        </StatHelpText>
                    </Stat>
                </Flex>
            </Box>
        </Box>
    );

}