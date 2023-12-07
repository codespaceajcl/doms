export function getToken() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth?.token;
}

export function getCurrentUser() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth;
}

export const dashboardColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "5px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#787878',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#787878',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
};