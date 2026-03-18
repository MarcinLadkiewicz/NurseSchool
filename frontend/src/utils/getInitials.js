const getInitials = (name, surname) => {
    const first = name?.charAt(0) || "";
    const last = surname?.charAt(0) || "";
    return `${first}${last}`.toUpperCase();
}
  

  export default getInitials;