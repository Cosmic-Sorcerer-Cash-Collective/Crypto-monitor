import { Box } from "@chakra-ui/react";

interface CardProps {
    title: string;
    description: string;
    price: number;
    onClick: () => void;
}

export function Card({ title, description, price, onClick }: CardProps) {
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

                <Box>
                    {price} €
                </Box>
            </Box>
        </Box>
    );

}