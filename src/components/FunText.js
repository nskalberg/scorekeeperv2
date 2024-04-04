import React from 'react';
import { useEffect } from 'react'
import { Stack, HStack, VStack, Text } from '@chakra-ui/react'

function FunText(props) {

    const characters = []

    const transformLBound = 1
    const transformUBound = 3
    const spacingLBound = 1
    const spacingUBound = 3.5

    const transformRange = transformUBound - transformLBound
    const spacingRange = spacingUBound - spacingLBound

    console.log(transformRange, spacingRange)

    const { text } = props
    for(var i = 0; i < text.length; i++){
        var random = Math.random().toFixed(2)
        characters.push({
            letter: text[i],
            transform: (transformLBound + random*transformRange).toFixed(2),
            spacing: (spacingLBound + random*spacingRange).toFixed(2),
            weight: (100 + 800 * random ).toFixed(0)
        })
    }

    const characterComponents = characters.map(character => {
        return (
            <span
                className="character"
                style={{
                    transformOrigin: 'left center',
                    fontFamily: 'Montserrat',
                    width: 'auto'
                }}
            >
                {character.letter}
            </span>
        )
    })

    useEffect(() => {
        var slides = document.getElementsByClassName("character");
        for (var i = 0; i < slides.length; i++) {
            console.log(slides[i].getBoundingClientRect())
            // slides[i].width = `${slides[i].getBoundingClientRect().width.toFixed(2)}px`
            console.log(slides[i].width)
        }
    }, [])

    console.log(characterComponents)
    return (
        <Text transform="scaleX(1.5)" transformOrigin="left center" >
            {characterComponents}
        </Text>
    )
}

export default FunText