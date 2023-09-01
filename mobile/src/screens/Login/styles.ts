import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'


const isAndroid = Platform.OS === 'android'

export const SafeContainer = styled.SafeAreaView`
  padding-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  /* padding-bottom: 0; */
`

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px 0;
`