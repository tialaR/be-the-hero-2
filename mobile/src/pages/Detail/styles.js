import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incident: {
    marginTop: 48,
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
  },
  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },
  contactBox: {
    marginBottom: 16, 
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  heroTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight: 30,
  },
  heroDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
  },
  actions: {
    marginTop: 16,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center'
  },
  action: {
    backgroundColor: '#E02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
