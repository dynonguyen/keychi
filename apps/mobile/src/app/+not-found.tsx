import { Link, Stack } from 'expo-router';
import React from 'react';
import StyledText from '../components/StyledText';

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Link href="/">
        <StyledText>Home Screen</StyledText>
      </Link>
    </React.Fragment>
  );
}
