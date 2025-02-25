import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Card } from './Card'

const TargNumOperatorRow = () => {
  return (
    <HStack>
        <Card text="add"/>
        <Card text="8"/>
    </HStack>
  )
}

export default TargNumOperatorRow