import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Card } from './Card'
import useNumGridStore from '../state-management/numGridStore'

const TargNumOperatorRow = () => {
    const { targetNum, operator } = useNumGridStore((s) => s.state.operandInfo);

  return (
    <HStack>
        <Card text={operator}/>
        <Card text={`${targetNum}`}/>
    </HStack>
  )
}

export default TargNumOperatorRow