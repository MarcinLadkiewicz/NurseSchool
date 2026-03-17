const getInitials = (name, surname) => {
    `${name?.charAt(0) || ''}${surname?.charAt(0)||''}`.toUpperCase();
}
  

  export default getInitials;