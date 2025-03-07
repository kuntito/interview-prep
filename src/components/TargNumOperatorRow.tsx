import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Card } from './Card'
import useNumGridStore from '../state-management/numGridStore'

const TargNumOperatorRow = () => {
    const { targetNum, operator } = useNumGridStore((s) => s.state.operandInfo);
  return (
    <HStack gap={"16px"}>
        <Card text={operator} scaleText={1.3} _borderColor='palette.300'/>
        <Card text={`${targetNum}`} _bgColor={"palette.100"}/>
    </HStack>
  )
}

export default TargNumOperatorRow