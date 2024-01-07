import React from 'react';
import { Section, Icon, Divider, ListRowItem } from '@src/components';
import { Switch } from 'react-native';
import { fontSize } from '@src/theme';

export const LinkedAccounts = () => {
  const [isGoogleAccountLinked, setIsGoogleAccountLinked] =
    React.useState(false);
  const [isFacebookAccountLinked, setIsFacebookAccountLinked] =
    React.useState(true);
  const [isAppleAccountLinked, setIsAppleAccountLinked] = React.useState(false);

  return (
    <Section title="Linked Accounts">
      <ListRowItem
        title="Google"
        leftElement={<Icon name="logo-google" size={fontSize.l} />}
        rightElement={
          <Switch
            value={isGoogleAccountLinked}
            onValueChange={(value) => setIsGoogleAccountLinked(value)}
          />
        }
      />
      <Divider />
      <ListRowItem
        title="Facebook"
        leftElement={<Icon name="logo-facebook" size={fontSize.l} />}
        rightElement={
          <Switch
            value={isFacebookAccountLinked}
            onValueChange={(value) => setIsFacebookAccountLinked(value)}
          />
        }
      />
      <Divider />
      <ListRowItem
        title="Apple"
        leftElement={<Icon name="logo-apple" size={fontSize.l} />}
        rightElement={
          <Switch
            value={isAppleAccountLinked}
            onValueChange={(value) => setIsAppleAccountLinked(value)}
          />
        }
      />
    </Section>
  );
};
