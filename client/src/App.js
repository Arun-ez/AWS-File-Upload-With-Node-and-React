import { Button, Flex, Heading, Image, Input, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

function App() {

  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');

  const upload = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setIsUploading(true);

    try {
      let response = await fetch('http://localhost:8080/api/storage/test_folder', {
        method: 'POST',
        body: formData
      })

      let { message, url } = await response.json();

      e.target.reset();

      if (response.ok) {
        setPublicUrl(url);
        toast.success(message);
      } else {
        toast.error(message);
      }

    } catch (error) {
      toast.error(error.message);
    }

    setIsUploading(false);
  }

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setIsUpdating(true);

    try {
      let response = await fetch('http://localhost:8080/api/storage', {
        method: 'PATCH',
        body: formData
      })

      let { message } = await response.json();

      if (response.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }

    } catch (error) {
      toast.error(error.message);
    }

    setIsUpdating(false);
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl).then(() => {
      toast.success('Copied');
    }).catch((_) => {
      toast.error('Unable to copy');
    });
  }

  return (
    <Flex p={6} pt={'10vh'} gap={6} h={'100vh'} w={'100%'} direction={['column', 'column', 'row', 'row']}>
      <VStack w={'100%'} >
        {publicUrl ? (
          <Stack>
            <Image src={publicUrl} alt="Aws S3 url" h={300} />
            <Button onClick={copyUrl}> Copy Url </Button>
            <Button onClick={() => setPublicUrl('')}> Upload More </Button>
          </Stack>
        ) : (
          <form onSubmit={upload}>
            <Heading my={4}> Upload File  </Heading>
            <Input name="file" type="file" required />
            <Button type="submit" my={4} isLoading={isUploading}> Upload </Button>
          </form>
        )}
      </VStack>

      <VStack w={'100%'}>
        <form onSubmit={update}>
          <Heading my={4}> Update File  </Heading>
          <Input name="url" type="url" placeholder="Enter Url to update" required />
          <Input name="file" type="file" my={4} required />
          <Button type="submit" isLoading={isUpdating}> Update </Button>
        </form>
      </VStack>
    </Flex>
  );
}

export default App;
