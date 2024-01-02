import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  coverPhotoContainer: {
    maxHeight: 225,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  tabBar: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
