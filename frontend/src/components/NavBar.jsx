import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import {
  ChevronDownIcon,
} from '@chakra-ui/icons';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import UserFormLayout from '../pages/UserForm';

export default function MainNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signIn, setSignIn] = useState(true);

  function handleUserClick(value) {
    onOpen();
    setSignIn(value);
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}>

        <Flex flex={{ base: 1 }} justify={{ base: 'none', md: 'start' }}>
          <Link to="/">
            <Text
              textAlign={"center"}
              fontFamily={'heading'}
              color={"logo.100"}
              fontSize={"x-large"}
              fontWeight={"bold"}
              ml={{base: 2, md: 4}}>
              STACKED
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={{base: 0, md: 10}}>
            <DesktopNav />
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={{base: 0, md: 8}}>
            <Input size='sm'  />
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={{base: 0, md: 8}}>
            <Button 
              id='sign-in-btn' 
              onClick={() => handleUserClick(true)}>
                Sign In
            </Button>            
            <Button 
              id='login-in-btn' 
              onClick={() => handleUserClick(false)} 
              ml={4} 
              bgColor='yellow.200' 
              _hover={{bgColor: 'yellow.300'}}>
                Log In
            </Button>

            <UserFormLayout handleSignIn={signIn} isOpen={isOpen} onClose={onClose} />
          </Flex>

        </Flex>
      </Flex>

    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
                {navItem.children && <Icon color={'green.400'} w={5} h={5} as={ChevronDownIcon} />}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                mt={1.5}
                p={3}
                rounded={'md'}
                minW={'xs'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
        </Flex>
      </Stack>
    </Box>
  )
}


interface NavItem {
  label: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Library'
  },
  {
    label: 'Study Tools ',
    children: [
      {
        label: 'Long Answer Test',
      },
      {
        label: 'Multiple Choice Quiz',
      },
      {
        label: 'Speed Run',
      },
    ],
  },
]