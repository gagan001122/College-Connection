import React from 'react'
import styled from 'styled-components'

function ProfilePage() {
  return (
    <Wrapper>
        <Container>
            Hello
        </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    background-color : #ADF0D3;
    height : 100vh;
    display : flex;
    flex-direction : column;
    align-items : center;
`
const Container = styled.div`
    width : 75vw;
    padding-top : 25vh;
    background-color : white;
    height : 100%;
`

export default ProfilePage