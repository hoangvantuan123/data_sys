export const togglePageInteraction = (isLoading) => {
    document.body.classList.toggle("page-loading", isLoading);
};
