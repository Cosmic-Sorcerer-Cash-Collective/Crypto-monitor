// ContactForm.tsx
import { Input, Textarea, Button, FormControl, FormLabel, FormErrorMessage, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const validationSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().max(500)
});

export type ValidationSchemaContactForm = z.infer<typeof validationSchema>;

interface ContactFormProps {
  onSubmit: (data: ValidationSchemaContactForm) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaContactForm>({ resolver: zodResolver(validationSchema) });

  return (
    <VStack align="stretch" spacing={4}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nom</FormLabel>
        <Input id="name" {...register('name')} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea id="message" {...register('message')} />
            <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Envoyer
        </Button>
    </VStack>
  );
};
