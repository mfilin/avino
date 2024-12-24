export const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: '2px solid #EFEFEF !important',
    borderRadius: '3px',
    height: '48px',
    padding: '0',
    boxShadow: '0',
    cursor: 'pointer',
  }),
  container: (baseStyles) => ({
    ...baseStyles,
    border: '0 !important',
    outlineStyle: 'none !important',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: () => ({ paddingLeft: '0px' }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: '#797979',
    fontSize: '15px',
    lineHeight: '18px',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: '#797979',
    fontSize: '15px',
    lineHeight: '18px',
    paddingLeft: '22px',
    backgroundColor: state.isSelected ? '#EFEFEF' : '#fff',
    cursor: 'pointer',
  }),
};
