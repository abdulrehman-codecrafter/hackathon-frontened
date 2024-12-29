import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const ActionSheet = forwardRef(({ content }, ref) => {
  return (
    <RBSheet
      ref={ref}
      customStyles={{ container: styles.container }}
      height={400}
      openDuration={250}>
      <View style={styles.body}>
        {content ? content : <Text>No content provided.</Text>}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  body: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActionSheet;
