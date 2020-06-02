const colors = {
  primary: '#1DCDFE',
  background: '#2F455C',
  card: '#34F5C5',
  text: '#2F455C',
  border: '#21D082',
};

const button = {
  marginTop: 10,
  backgroundColor: colors.card,
  width: '40%',
  paddingVertical: 10,
  alignSelf: 'center',
  borderRadius: 15,
};

const buttonText = {
  textAlign: 'center',
  color: colors.text,
};

const container = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

const textInput = {
  backgroundColor: colors.background,
  textAlign: 'center',
  borderColor: colors.card,
  borderWidth: 2,
  borderRadius: 15,
  width: '80%',
  marginTop: 10,
  color: 'white',
};

const header = {
  fontSize: 32,
  fontWeight: 'bold',
}

export const MyTheme = {
  dark: false,
  colors: colors,
  button: button,
  buttonText: buttonText,
  container: container,
  textInput: textInput,
  header: header
};
