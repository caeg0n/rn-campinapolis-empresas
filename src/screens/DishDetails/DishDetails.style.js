import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 55,
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  coverPhotoContainer: {
    maxHeight: 225,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
});
